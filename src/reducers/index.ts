import { plug, plugs, search } from './plug';
// import { persistCombineReducers } from 'redux-persist';
import { combineReducers } from 'redux';
import { Plug } from '../beans/plug';

export const reducer = combineReducers<State>({
    plug,
    plugs,
    search,
});

export interface State {
    readonly plug: Plug;
    readonly plugs: ReadonlyArray<Plug>;
    readonly search: string;
}