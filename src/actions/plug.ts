
import { Plug } from '../beans/plug';

export interface PlugsAction {
    readonly type: string;
    readonly plugs: ReadonlyArray<Plug>;
}

export interface PlugAction {
    readonly type: string;
    readonly plug: Plug;
}
export interface SearchAction {
    readonly type: string;
    readonly search: string;
}

export const setPlugs = (plugs: ReadonlyArray<Plug>): PlugsAction => {
    return { type: 'SET_PLUGS', plugs };
};

export const setPlug = (plug: Plug): PlugAction => {
    return { type: 'SET_PLUG', plug };
};

export const setSearch = (search: string): SearchAction => {
    return { type: 'SET_SEARCH', search };
};
