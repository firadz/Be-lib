import { plugCaracteristiques } from './../constants/utils';
import { Adresse } from './adresse';

export type PlugModelType = 'E/F' | 'T3' | 'T2' | 'CHAdeMO' | 'Combo';

export class Plug {
    readonly dataSetId: string;
    readonly id: string;
    readonly staticOpnning: string;
    readonly statut: string;
    readonly model: PlugModelType;
    readonly orientation: string;
    readonly adresse: Adresse;

    constructor(
        dataSetId: string,
        id: string,
        staticOpnning: string,
        statut: string,
        model: PlugModelType,
        orientation: string,
        adresse: Adresse,
    ) {
        this.dataSetId = dataSetId;
        this.id = id;
        this.staticOpnning = staticOpnning;
        this.statut = statut;
        this.model = model;
        this.orientation = orientation;
        this.adresse = adresse;
    }

    getCaracteristique() {
        return plugCaracteristiques[this.model];
    }

    static NULL = new Plug('', '', '', '', 'E/F', '', Adresse.NULL);
}