import _ from 'lodash';

import { assignColor } from './colors';

export class Planner {
    constructor() {
        this.cutoffs = [];
        this.buy = [];
        this.settings = {
            kerf: 0.125 * 2
        };
    }

    sortLargestToSmallest(collection) {
        collection.sort((a, b) => {
            if (a.width == b.width)
            return b.length - a.length;
            return b.width - a.width;
        });
        return collection;
    }

    sortSmallestToLargest(collection) {
        collection.sort((a, b) => {
            if (a.width == b.width)
            return a.length - b.length;
            return a.width - b.width;
        });
        return collection;
    }

    getAvailablePanelStockFor(needed) {
        return _.first(_.filter(this.available, (availStock) => {
            return availStock.thickness == needed.thickness &&
            availStock.width <= needed.width;
        }));
    }

    getAvailableSourceStockFor(needed) {
        return _.first(_.filter(this.available, (availStock) => {
            return availStock.thickness == needed.thickness &&
            (availStock.width >= needed.width || availStock.width === 0) &&
            (availStock.length >= needed.length);
        }));
    }

    findCutoffFor(required) {
        return _.first(_.filter(this.cutoffs, (cutoff) => {
            return cutoff.thickness === required.thickness && cutoff.width >= required.width && cutoff.length >= required.length;
        }));
    }

    isPanel(needed) {
        return !_.some(this.available, (availStock) => {
            return needed.width <= availStock.width;
        });
    }

    layoutStock(needed, parent) {
        let sourceStock = this.findCutoffFor(needed);
        if (_.isUndefined(sourceStock)) {
            const availStock = this.getAvailableSourceStockFor(needed);
            if (_.isUndefined(availStock)) {
                parent.unavailable = true;
                // console.log(needed);
                return;
            }
            parent.unavailable = false;
            sourceStock = _.extend({
                yields: [],
                left: 0,
                top: 0,
                raw: true,
                template: availStock
            }, _.cloneDeep(availStock));
            this.buy.push(sourceStock);
        }
        else {
            parent.unavailable = false;
            this.cutoffs = _.pull(this.cutoffs, sourceStock);
        }

        sourceStock.yields.push(_.extend({
            left: sourceStock.left,
            top: sourceStock.top,
            parent: parent
        }, needed));

        const currentCutoffs = [];

        if (needed.length < sourceStock.length) {
            currentCutoffs.push({
                left: sourceStock.left,
                top: sourceStock.top + needed.length + this.settings.kerf,
                thickness: needed.thickness,
                width: sourceStock.width,
                length: sourceStock.length - needed.length - this.settings.kerf,
                cutoff: true,
                yields: []
            });
        }

        if (needed.width < sourceStock.width) {
            currentCutoffs.push({
                left: sourceStock.left + needed.width + this.settings.kerf,
                top: sourceStock.top,
                thickness: needed.thickness,
                width: sourceStock.width - needed.width - this.settings.kerf,
                length: needed.length,
                cutoff: true,
                yields: []
            });
        }
        if (_.some(currentCutoffs)) {
            this.cutoffs = this.sortSmallestToLargest(this.cutoffs.concat(currentCutoffs));
            sourceStock.yields = sourceStock.yields.concat(currentCutoffs);
        }
    }

    flattenYields(board) {
        const yields = [];
        let queue = _.cloneDeep(board.yields);
        while (queue.length > 0)
        {
            const item = queue.pop();
            if (_.isArray(item.yields)) {
                queue = queue.concat(item.yields);
            }
            yields.push(item);
        }
        return yields;
    }

    boardVolume(board) {
        return Math.ceil(board.thickness) * board.width * board.length;
    }

    calculateBoardEfficiency(board) {
        const yields = _.filter(this.flattenYields(board), (board) => { return !board.cutoff; });
        const usedVolume = _.reduce(_.map(yields, this.boardVolume), (sum, num) => { return sum + num; }, 0);
        const totalVolume = this.boardVolume(board);

        return _.extend({
            totalVolume: totalVolume,
            usedVolume: usedVolume,
            efficiency: usedVolume / totalVolume * 100
        }, board, {
            id: _.uniqueId('b'),
        });
    }

    getBoardKey(board) {
        return board.thickness + "x" + board.width + "x" + board.length;
    }

    getPurchaseList(buy) {
        return _.map(_.groupBy(buy, (board) => {
            return this.getBoardKey(board.template);
        }), function(k, v) {
            const template = _.cloneDeep(k[0].template);
            return _.extend({
                quantity: k.length,
                feet: k.length * (template.length / 12),
                bdft: k.length * (Math.ceil(template.thickness) * template.width * template.length / 144)
            }, template);
        });
    }

    calculate(available, necessary) {
        this.cutoffs = [];
        this.buy = [];
        this.available = _.sortBy(available, 'width').reverse();

        const necessaryByWidthAndLength = this.sortLargestToSmallest(_.clone(necessary));
        while (_.some(necessaryByWidthAndLength)) {
            const needed = necessaryByWidthAndLength.shift();
            for (let i = 0; i < needed.quantity; ++i) {
                if (this.isPanel(needed)) {
                    const sourceStock = this.getAvailablePanelStockFor(needed);
                    if (!_.isUndefined(sourceStock)) {
                        const pieces = Math.ceil(needed.width / sourceStock.width);
                        let widthRemaining = needed.width;
                        for (let piece = 0; piece < pieces; ++piece) {
                            const panelPart = {
                                thickness: needed.thickness,
                                width: Math.min(sourceStock.width, widthRemaining),
                                length: needed.length,
                                panel: true,
                                panelWidth: needed.width,
                                color: needed.color
                            };
                            this.layoutStock(panelPart, needed);
                            widthRemaining -= sourceStock.width;
                        }
                    }
                }
                else {
                    this.layoutStock(needed, needed);
                }
            }
        }

        return {
            boards: _.map(this.buy, (board) => this.calculateBoardEfficiency(board)),
            purchase: this.getPurchaseList(this.buy),
            unavailable: _.filter(necessary, { unavailable: true })
        };
    }
}
