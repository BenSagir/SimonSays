/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import scoreReducer from './reducer';

const rootReducer = combineReducers({ scoreReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
