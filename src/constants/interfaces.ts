export type ICOLORS = 'accent' | 'primary' | 'secondary' | 'tertiary' |
    'overlay' | 'black' | 'white' | 'gray' | 'red' | 'gray2' | 'gray3';

export interface Point {
    x: number;
    y: number;
}
export interface Icolors {
    readonly accent: string;
    readonly primary: string;
    readonly secondary: string;
    readonly tertiary: string;
    readonly black: string;
    readonly white: string;
    readonly red: string;
    readonly green: string;
    readonly overlay: string;
    readonly gray: string;
    readonly gray2: string;
    readonly gray3: string;
    readonly light: string;
}

export interface Isizes {
    readonly base: number;
    readonly icon: number;
    readonly font: number;
    readonly radius: number;
    readonly padding: number;
    readonly h1: number;
    readonly h2: number;
    readonly h3: number;
    readonly title: number;
    readonly header: number;
    readonly body: number;
    readonly caption: number;
    readonly small: number;
    readonly margin: number;
}

export interface Ifonts {
    readonly h1: {
        readonly fontSize: number;
    };
    readonly h2: {
        readonly fontSize: number;
    };
    readonly h3: {
        readonly fontSize: number;
    };
    readonly header: {
        readonly fontSize: number;
    };
    readonly title: {
        readonly fontSize: number;
    };
    readonly body: {
        readonly fontSize: number;
    };
    readonly caption: {
        readonly fontSize: number;
    };
    readonly small: {
        readonly fontSize: number;
    };
}