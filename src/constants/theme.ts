import { Ifonts, Isizes, Icolors } from './interfaces';
const colors: Icolors = {
    accent: '#F3534A',
    primary: '#0AC4BA',
    secondary: '#2BDA8E',
    tertiary: '#FFE358',
    black: '#323643',
    white: '#FFFFFF',
    gray: '#9DA3B4',
    gray2: '#C5CCD6',
    gray3: '#D8DBE6',
    overlay: '#C1BEC0',
    red: '#D83C54',
    green: '#1CEF5B',
    light: 'rgba(142, 142, 147, 0.06)',
};

const sizes: Isizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 10,
    padding: 25,

    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
    small: 11,
    icon: 24,
    margin: 8,
};

const fonts: Ifonts = {
    h1: {
        fontSize: sizes.h1
    },
    h2: {
        fontSize: sizes.h2
    },
    h3: {
        fontSize: sizes.h3
    },
    header: {
        fontSize: sizes.header
    },
    title: {
        fontSize: sizes.title
    },
    body: {
        fontSize: sizes.body
    },
    caption: {
        fontSize: sizes.caption
    },
    small: {
        fontSize: sizes.small
    },
};

export { colors, sizes, fonts };