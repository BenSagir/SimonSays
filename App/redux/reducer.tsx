/* eslint-disable prettier/prettier */
import { Action } from 'redux';
import { SET_SCORE } from './actions';

const initialState = {
    score: 0,
};
export interface ActionWithPayload<T> extends Action {
    payload: T;
}
function scoreReducer(state = initialState, action: ActionWithPayload<number>): typeof state {
    switch (action.type) {
        case SET_SCORE:
            return { ...state, score: action.payload };
        default:
            return state;
    }
}
export default scoreReducer;
