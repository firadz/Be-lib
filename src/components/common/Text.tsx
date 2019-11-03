// just copy this code from the driving repo :)
import React, { Component } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { theme } from '../../constants';
import { ICOLORS } from '../../constants/interfaces';

interface OwnProps {
    readonly style?: any;
    readonly h1?: boolean;
    readonly h2?: boolean;
    readonly h3?: boolean;
    readonly title?: boolean;
    readonly body?: boolean;
    readonly caption?: boolean;
    readonly small?: boolean;
    readonly size?: number;
    readonly transform?: 'capitalize' | 'inherit' | 'initial' | 'lowercase' | 'none' | 'unset' | 'uppercase';
    readonly align?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end' | 'inherit' | 'initial';
    readonly height?: number;
    readonly spacing?: number;
    readonly weight?: number;
    readonly regular?: boolean;
    readonly bold?: boolean;
    readonly semibold?: boolean;
    readonly medium?: boolean;
    readonly light?: boolean;
    readonly center?: boolean;
    readonly right?: boolean;
    readonly color?: ICOLORS;
    readonly customColor?: string;
    readonly costumColor?: string;
    readonly accent?: boolean;
    readonly primary?: boolean;
    readonly secondary?: boolean;
    readonly tertiary?: boolean;
    readonly black?: boolean;
    readonly white?: boolean;
    readonly gray?: boolean;
    readonly gray2?: boolean;
}

type Props = OwnProps & TextProps;

export default class Typography extends Component<Props> {
    render() {
        const {
            h1,
            h2,
            h3,
            title,
            body,
            caption,
            small,
            size,
            transform,
            align,
            // styling
            regular,
            bold,
            semibold,
            medium,
            weight,
            light,
            center,
            right,
            spacing, // letter-spacing
            height, // line-height
            // colors
            color,
            customColor,
            accent,
            primary,
            secondary,
            tertiary,
            black,
            white,
            gray,
            gray2,
            style,
            children,
            ...props
        } = this.props;

        const textStyles = [
            styles.text,
            h1 && styles.h1,
            h2 && styles.h2,
            h3 && styles.h3,
            title && styles.title,
            body && styles.body,
            caption && styles.caption,
            small && styles.small,
            size && { fontSize: size },
            transform && { textTransform: transform },
            align && { textAlign: align },
            height && { lineHeight: height },
            spacing && { letterSpacing: spacing },
            weight && { fontWeight: weight },
            regular && styles.regular,
            bold && styles.bold,
            semibold && styles.semibold,
            medium && styles.medium,
            light && styles.light,
            center && styles.center,
            right && styles.right,
            color && styles[color],
            customColor && { color: customColor },
            // color shortcuts
            accent && styles.accent,
            primary && styles.primary,
            secondary && styles.secondary,
            tertiary && styles.tertiary,
            black && styles.black,
            white && styles.white,
            gray && styles.gray,
            gray2 && styles.gray2,
            style // rewrite predefined styles
        ];

        return (
            <Text style={textStyles} {...props}>
                {children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    // default style
    text: {
        fontSize: theme.sizes.font,
        color: theme.colors.black
    },
    // variations
    regular: {
        fontWeight: 'normal',
    },
    bold: {
        fontWeight: 'bold',
    },
    semibold: {
        fontWeight: '500',
    },
    medium: {
        fontWeight: '500',
    },
    light: {
        fontWeight: '200',
    },
    // position
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    // colors
    accent: { color: theme.colors.accent },
    primary: { color: theme.colors.primary },
    secondary: { color: theme.colors.secondary },
    tertiary: { color: theme.colors.tertiary },
    black: { color: theme.colors.black },
    white: { color: theme.colors.white },
    gray: { color: theme.colors.gray },
    gray2: { color: theme.colors.gray2 },
    gray3: { color: theme.colors.gray3 },
    red: { color: theme.colors.red },
    // fonts
    h1: theme.fonts.h1,
    h2: theme.fonts.h2,
    h3: theme.fonts.h3,
    title: theme.fonts.title,
    body: theme.fonts.body,
    caption: theme.fonts.caption,
    small: theme.fonts.small
});
