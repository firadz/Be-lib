interface PlugCaracteristiqueInterface {
    image: number;
    modeSortie: string;
    typeCourant: string;
    tensionMaxi: string;
    courantMaxi: string;
    puissanceMaxi: string;
    name: string;
}
interface PlugCaracteristiquesIneterface {
    'E/F': PlugCaracteristiqueInterface;
    'T3': PlugCaracteristiqueInterface;
    'T2': PlugCaracteristiqueInterface;
    'CHAdeMO': PlugCaracteristiqueInterface;
    'Combo': PlugCaracteristiqueInterface;
}
export const plugCaracteristiques: PlugCaracteristiquesIneterface = {
    'E/F': {
        image: require('../../assets/images/domestique.png'),
        modeSortie: 'Prise',
        typeCourant: 'AC1',
        name: 'Domestique',
        tensionMaxi: '220 Volt',
        courantMaxi: '16 A',
        puissanceMaxi: '3 000 W',
    },
    'T3': {
        image: require('../../assets/images/type_3.png'),
        modeSortie: 'Prise',
        typeCourant: 'AC1_AC3',
        name: 'T3',
        tensionMaxi: '400 Volt',
        courantMaxi: '32 A',
        puissanceMaxi: '22 000 W',
    },

    'T2': {
        image: require('../../assets/images/type_2.png'),
        modeSortie: 'Prise',
        typeCourant: 'AC1_AC3',
        name: 'T2',
        tensionMaxi: '400 Volt',
        courantMaxi: '32 A',
        puissanceMaxi: '22 000 W',
    },
    'CHAdeMO': {
        image: require('../../assets/images/ch_de_mo.png'),
        modeSortie: 'Câble',
        typeCourant: 'DC',
        name: 'ChaDeMo',
        tensionMaxi: '400 Volt',
        courantMaxi: '32 A',
        puissanceMaxi: '22 000 W',
    },
    'Combo': {
        image: require('../../assets/images/combo_type_2.png'),
        modeSortie: 'Câble',
        typeCourant: 'DC',
        name: 'Combo T2',
        tensionMaxi: '400 Volt',
        courantMaxi: '32 A',
        puissanceMaxi: '22 000 W',
    }
};

export const isEmail = (email = null) => {

    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);

};