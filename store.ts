import { applyMiddleware, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { reducer, State } from './src/reducers';

// export type ThunkActionCreator<R> = (...args: any[]) => ThunkAction<R, State, void>;
export type ThunkActionCreator<R> = (...args: any[]) => any;
export const store = createStore(
    reducer,
    {},
    composeWithDevTools(
        applyMiddleware(...[thunkMiddleware]),
    )
);