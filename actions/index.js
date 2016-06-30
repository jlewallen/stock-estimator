import { Planner } from '../reducers/Planner';

export const SELECT_CUT_LIST = 'selectCutList';

export function selectCutList(cutList) {
    return (dispatch, getState) => {
        dispatch({
            type: SELECT_CUT_LIST,
            cutList: cutList
        });
    };
}

export const SELECT_STOCK_SET = 'selectStockSet';

export function selectStockSet(stockSet) {
    return (dispatch, getState) => {
        dispatch({
            type: SELECT_STOCK_SET,
            stockSet: stockSet
        });
    };
}

export const PLAN_CUTS_START = 'planCutsStart';
export const PLAN_CUTS_SUCCESS = 'planCutsSuccess';

function plan(stockSet, cutList) {
    if (_.isUndefined(stockSet.available) || _.isUndefined(cutList.necessary)) {
        return null;
    }
    const planner = new Planner();
    return planner.calculate(stockSet.available, cutList.necessary);
}

export function planCuts(stockSet, cutList) {
    return (dispatch, getState) => {
        dispatch({
            type: PLAN_CUTS_START,
            stockSet: stockSet,
            cutList: cutList
        });

        const buy = plan(stockSet, cutList);

        dispatch({
            type: PLAN_CUTS_SUCCESS,
            stockSet: stockSet,
            cutList: cutList,
            buy: buy
        });
    };
}

export const HOVERING_OVER_BOARDS = 'hoveringOverBoards';

export function hoverOverBoards(boards) {
    return (dispatch, getState) => {
        dispatch({
            type: HOVERING_OVER_BOARDS,
            boards: boards
        });
    };
}

export const NEW_STOCK_SET = 'newStockSet';

export function newStockSet(template) {
    return (dispatch, getState) => {
        dispatch({
            type: NEW_STOCK_SET,
            template: template
        });
    };
}

export const NEW_CUT_LIST = 'newCutList';

export function newCutList(template) {
    return (dispatch, getState) => {
        dispatch({
            type: NEW_CUT_LIST,
            template: template
        });
    };
}

export const EXPORT_ALL = 'exportAll';

export function clearAll() {
    return (dispatch, getState) => {
        dispatch({
            type: EXPORT_ALL,
            data: {
                stockSets: getState().stockSets,
                cutLists: getState().cutLists
            }
        });
    };
}

export const IMPORT_STOCK_SET = 'importStockSet';
export const IMPORT_CUT_LIST = 'importCutList';

function importAnythingWeFind(dispatch, data) {
    if (_.isArray(data.stockSets)) {
        _.forEach(data.stockSets, item => importAnythingWeFind(dispatch, item));
    }
    if (_.isArray(data.cutLists)) {
        _.forEach(data.cutLists, item => importAnythingWeFind(dispatch, item));
    }
    if (_.isArray(data.cutList)) {
        dispatch({
            type: IMPORT_CUT_LIST,
            cutList: data.cutList
        });
    }
    if (_.isArray(data.stockSet)) {
        dispatch({
            type: IMPORT_STOCK_SET,
            stockSet: data.stockSet
        });
    }
}

export function importAnything(data) {
    return (dispatch, getState) => {
        if (_.isArray(data)) {
            _.forEach(data, item => importAnythingWeFind(dispatch, item));
        }
        else {
            importAnythingWeFind(dispatch, item)
        }
    };
}

export const CLEAR_ALL = 'clearAll';

export function clearAll() {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_ALL
        });
    };
}
