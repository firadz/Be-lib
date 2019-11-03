import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Block, { BlockProps } from './Block';
import { theme } from '../../constants';
import { ICOLORS } from '../../constants/interfaces';

interface OwnProps {
    readonly style?: any;
    readonly size?: number;
    readonly color?: ICOLORS;
}

type Props = OwnProps & BlockProps;
export default class Divider extends Component<Props> {
    render() {
        const { color, style, ...props } = this.props;
        const dividerStyles = [
            styles.divider,
            style,
        ];

        return (
            <Block
                color={color || theme.colors.gray2 as ICOLORS}
                style={dividerStyles}
                {...props}
            />
        );
    }
}

export const styles = StyleSheet.create({
    divider: {
        height: 0,
        marginTop: theme.sizes.base,
        marginBottom: theme.sizes.base,
        marginRight: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});
