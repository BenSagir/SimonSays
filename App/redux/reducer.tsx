/* eslint-disable prettier/prettier */
import { Action } from 'redux';
import { SET_SCORE, SET_PLAY } from './actions';

const initialState = {
    score: -1,
    play: false,
};
export interface ActionWithPayload<T> extends Action {
    payload: T;
}
export function scoreReducer(state = initialState, action: ActionWithPayload<number>): typeof state {
    switch (action.type) {
        case SET_SCORE:
            return { ...state, score: action.payload };
        default:
            return state;
    }
}
export function playReducer(state = initialState, action: ActionWithPayload<boolean>): typeof state {
    switch (action.type) {
        case SET_PLAY:
            return { ...state, play: action.payload };
        default:
            return state;
    }
}
