import { createSelector, Selector } from 'reselect';
import { State } from '.';
import { Plug } from './../beans/plug';

const getSearch: Selector<State, string> = (state: State) => state.search;
const getPlugs: Selector<State, ReadonlyArray<Plug>> = (state: State) => state.plugs;

export const getPlugsFiltred = createSelector(
    getPlugs, getSearch,
    (plugs, search) => {
        return getPlugsFiltredBySearch(plugs, search);
    }
);

const getPlugsFiltredBySearch = (plugs: ReadonlyArray<Plug>, search: string) =>
    plugs.filter(plug => search === '' ? plugs :
    plug.adresse.rue.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
    plug.adresse.num.toString().toUpperCase().indexOf(search.toUpperCase()) > -1 ||
    plug.adresse.city.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
    plug.adresse.cp.toString().toUpperCase().indexOf(search.toUpperCase()) > -1 ||
    plug.model.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
    plug.statut.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
    plug.id.toString().toUpperCase().indexOf(search) > -1);