import _ from 'lodash';
import * as ActionTypes from '../actions';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

function nothing(state = {}, action = {}) {
    return state;
}

const rootReducer = combineReducers({
    nothing,
    router
});

export default rootReducer;
