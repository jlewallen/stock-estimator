import _ from 'lodash';
import * as ActionTypes from '../actions';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

import { assignColor } from './colors';

function newBoard(obj) {
    return _.extend(obj, { id: _.uniqueId('b') });
}

var frameSaw = assignColor([
    newBoard({ quantity: 2, thickness: 1.625, width: 1.375, length: 66, name: "" }),
    newBoard({ quantity: 2, thickness: 1.625, width: 3, length: 24, name: "" }),
]);
var dutchChest = assignColor([
    newBoard({ quantity: 2, thickness: 0.75, width: 11.25, length: 30.125, name: "Sides" }),
    newBoard({ quantity: 1, thickness: 0.75, width: 11.25, length: 27, name: "Bottom" }),
    newBoard({ quantity: 2, thickness: 0.75, width: 11.25, length: 26, name: "Shelves" }),
    newBoard({ quantity: 1, thickness: 0.75, width: 7, length: 27, name: "Front" }),
    newBoard({ quantity: 1, thickness: 0.75, width: 1.5, length: 27, name: "Bottom Lip" }),
    newBoard({ quantity: 1, thickness: 0.75, width: 15.5, length: 28.375, name: "Lid" }),
    newBoard({ quantity: 2, thickness: 0.75, width: 1.25, length: 12, name: "Skids" }),
    newBoard({ quantity: 1, thickness: 0.75, width: 30.5, length: 27, name: "Back" }),
    newBoard({ quantity: 1, thickness: 0.75, width: 15, length: 27, name: "Fall-front" }),
    newBoard({ quantity: 2, thickness: 0.5, width: 1.5, length: 15, name: "Panel Battens" }),
    newBoard({ quantity: 4, thickness: 0.75, width: 0.75, length: 4, name: "Catches" }),
    newBoard({ quantity: 2, thickness: 0.5, width: 2, length: 23.125, name: "Locks" })
]);

const defaultCutLists = [
    { id: 1, name: 'Dutch Tool Chest', necessary: dutchChest },
    { id: 2, name: 'Frame Saw', necessary: frameSaw }
];

const defaultStockSets = [
    { id: 1, name: 'Home Depot - Select Pine', available: [
        newBoard({ thickness: 0.75, width: 11.25, length: 96 }),
        newBoard({ thickness: 0.5, width: 4, length: 36 })
    ]},
    { id: 2, name: 'Home Depot - Construction', available: [
        newBoard({ thickness: 1.75, width: 12, length: 96 }),
        newBoard({ thickness: 1.75, width: 10, length: 96 })
    ]},
    { id: 3, name: 'Hardwood', available: [
        newBoard({ thickness: 0.750, width: 6, length: 96 }),
        newBoard({ thickness: 1.625, width: 6, length: 96 })
    ]}
];

function nothing(state = {}, action = {}) {
    return state;
}

function stockSets(state = [], action = {}) {
    return defaultStockSets;
}

function cutLists(state = [], action = {}) {
    return defaultCutLists;
}

function currentCutList(state = {}, action = {}) {
    switch (action.type) {
        case ActionTypes.SELECT_CUT_LIST:
            return _.cloneDeep(action.cutList);
        case ActionTypes.PLAN_CUTS_SUCCESS: {
            const cutList = _.cloneDeep(state);
            const unavailable = _.groupBy(action.buy.unavailable, 'id');
            cutList.necessary.forEach(necessary => {
                necessary.unavailable = unavailable[necessary.id] != null;
            });
            return cutList;
        }
        case ActionTypes.HOVERING_OVER_BOARDS: {
            const cutList = _.cloneDeep(state);
            const boards = _.groupBy(action.boards, 'id');
            cutList.necessary.forEach(necessary => {
                necessary.hovering = boards[necessary.id] != null;
            });
            return cutList;
        }
        default:
            return state;
    }
}

function currentStockSet(state = {}, action = {}) {
    switch (action.type) {
        case ActionTypes.SELECT_STOCK_SET:
            return _.cloneDeep(action.stockSet);
        default:
            return state;
    }
}

function buy(state = { buy: null, stockSet: {}, cutList: {} }, action = {}) {
    switch (action.type) {
        case ActionTypes.SELECT_CUT_LIST:
            return {};
        case ActionTypes.SELECT_STOCK_SET:
            return {};
        case ActionTypes.PLAN_CUTS_START:
            return {};
        case ActionTypes.PLAN_CUTS_SUCCESS: {
            return _.extend(action.buy, {
                id: _.uniqueId("plan")
            });
        }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    nothing,
    stockSets,
    cutLists,
    currentStockSet,
    currentCutList,
    buy,
    router
});

export default rootReducer;
