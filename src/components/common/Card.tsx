import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Block, { BlockProps } from './Block';
import { theme } from '../../constants';
import { Icolors, ICOLORS } from '../../constants/interfaces';

interface OwnProps {
    readonly style?: any;
    readonly size?: number;
    readonly color?: ICOLORS;
}

type Props = OwnProps & BlockProps;
export default class Card extends Component<Props> {
    render() {
        const { color, style, children, ...props } = this.props;
        const cardStyles = [
            styles.card,
            style,
        ];

        return (
            <Block color={color || theme.colors.white as ICOLORS} style={cardStyles} {...props}>
                {children}
            </Block>
        );
    }
}

export const styles = StyleSheet.create({
    card: {
        borderRadius: theme.sizes.radius,
        padding: theme.sizes.base + 4,
        marginBottom: theme.sizes.base,
    },
});
