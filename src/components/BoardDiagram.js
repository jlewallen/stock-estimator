import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

export class BoardDiagram extends Component {
    constructor() {
        super();
        // These should be done differently?
        this.rectangles = [];
        this.hovering = [];
    }

    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.theCanvas);
        const ctx = canvas.getContext('2d');

        let toX;
        let toY;

        const draw = (part) => {
            const x = toX(part.left);
            const y = toY(part.top);
            const w = toX(part.width);
            const h = toY(part.length);

            if (_.isString(part.color)) {
                ctx.fillStyle = '#' + part.color;
            }
            else if (part.cutoff) {
                ctx.fillStyle = '#ddeeee';
            }
            else if (part.raw) {
                ctx.fillStyle = '#cecece';
            }
            else if (part.panel) {
                ctx.fillStyle = '#dd20f6';
            }
            else {
                ctx.fillStyle = '#ad21f6';
            }

            this.rectangles.push({ x: x, y: y, w: w, h: h, part: part });

            ctx.fillRect(x, y, w, h);

            _.each(part.yields, (yielded) => {
                draw(yielded);
            });
        };

        const allBoards = this.props.allBoards
        const longest = _.max(_.map(allBoards, 'length'));
        const widest = _.max(_.map(allBoards, 'width'));

        const board = this.props.board;
        const maxX = 64.0;
        const maxY = 512.0;

        toX = (inc) => {
            return inc * maxX / widest;
        };
        toY = (inc) => {
            return inc * maxY / longest;
        };

        draw(board);
    }

    find(x, y) {
        return _.filter(this.rectangles, function(rect) {
            return x >= rect.x && y >= rect.y && (x < (rect.x + rect.w)) && (y < (rect.y + rect.h));
        });
    }

    handleMouseMove(e) {
        const { onHoverOverBoards } = this.props;

        if (!e) {
            this.hovering = [];
            onHoverOverBoards([]);
            return;
        }

        const newHovering = _.map(_.filter(this.find(e.offsetX, e.offsetY), function(rect) {
            return !rect.part.raw && !rect.part.cutoff;
        }), function(rect) {
            return rect.part;
        });

        const newIds = _(newHovering).map('parent').map('id').value();
        const oldIds = _(this.hovering).map('parent').map('id').value();
        if (_.xor(oldIds, newIds).length > 0) {
            onHoverOverBoards(_.map(newHovering, 'parent'));
            this.hovering = newHovering;
        }
    }

    render() {
        return (
            <div>
                <canvas ref="theCanvas" width='64px' height='512px'
                    onMouseMove={(e) => this.handleMouseMove(e.nativeEvent)}
                    onMouseOut={(e) => this.handleMouseMove(null)} />
            </div>
        );
    }
}

BoardDiagram.propTypes = {
    allBoards: PropTypes.array.isRequired,
    board: PropTypes.object.isRequired,
    onHoverOverBoards: PropTypes.func.isRequired
};
