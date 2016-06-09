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
