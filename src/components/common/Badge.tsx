import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Block, { BlockProps } from './Block';
import { theme } from '../../constants';

interface OwnProps {
    readonly style?: any;
    readonly size?: number;
}

type Props = OwnProps & BlockProps;
export default class Badge extends Component<Props> {
    render() {
        const { children, style, size, color, ...props } = this.props;

        const badgeStyles = StyleSheet.flatten([
            styles.badge,
            size && {
                height: size,
                width: size,
                borderRadius: size,
            },
            style,
        ]);

        return (
            <Block flex={false} middle center color={color} style={badgeStyles} {...props}>
                {children}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    badge: {
        height: theme.sizes.base,
        width: theme.sizes.base,
        borderRadius: theme.sizes.radius,
    }
});
