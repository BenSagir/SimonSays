/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { scoreReducer, playReducer } from './reducer';

const rootReducer = combineReducers({ scoreReducer, playReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
