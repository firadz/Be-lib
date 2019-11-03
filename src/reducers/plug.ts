import { SearchAction } from './../actions/plug';
import { PlugsAction, PlugAction } from '../actions/plug';
import { Plug } from '../beans/plug';
import { prises } from '../constants/prises_electriques_vehicules_tps_reel';
import { Adresse } from '../beans/adresse';

const ps = prises.slice(0, 10).map((prise: any) => {
    return new Plug(
        prise.datasetid,
        prise.recordid,
        prise.fields.static_opening,
        prise.fields.plugs_status,
        prise.fields.plugs_outletmodel,
        prise.fields.plugs_orientation,
        new Adresse(
            prise.fields.geolocation_streetnumber,
            prise.fields.static_name,
            prise.fields.geolocation_route,
            prise.fields.geolocation_city,
            prise.fields.geolocation_postalcode,
            prise.fields.geolocation_country,
            prise.geometry.coordinates[1] || 0,
            prise.geometry.coordinates[0] || 0,
        )
    );
});

export const plugs = (state: ReadonlyArray<Plug> = ps, action: PlugsAction) => {
    if (action.type === 'SET_PLUGS') {
        return action.plugs;
    }
    return state;
};

export const plug = (state: Plug = ps[0], action: PlugAction) => {
    if (action.type === 'SET_PLUG') {
        return action.plug;
    }
    return state;
};

export const search = (state: string = '', action: SearchAction) => {
    if (action.type === 'SET_SEARCH') {
        return action.search;
    }
    return state;
};