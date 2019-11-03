export class Adresse {
    readonly city: string;
    readonly cp: string;
    readonly pays: string;
    readonly rue: string;
    readonly nom: string;
    readonly num: string;
    readonly lat: number;
    readonly lng: number;

    constructor(num: string,
        nom: string,
        rue: string,
        city: string,
        cp: string,
        pays: string,
        lat: number,
        lng: number
    ) {
        this.num = num;
        this.nom = nom;
        this.rue = rue;
        this.city = city;
        this.cp = cp;
        this.pays = pays;
        this.lat = lat;
        this.lng = lng;
    }
    static NULL = new Adresse('', '', '', '', '', '', 0, 0);

    toString() {
        return `${this.num} ${this.rue}, ${this.city}, ${this.cp}`;
    }
}