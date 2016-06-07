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
