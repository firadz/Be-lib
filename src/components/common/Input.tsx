import React, { Component } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import Text from './Text';
import Block from './Block';
import Button from './Button';
import { theme } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

interface OwnProps {
    readonly rightlabel?: any;
    readonly rightstyle?: any;
    readonly onRightPress?: () => void;
    readonly label?: string;
    readonly email?: boolean;
    readonly phone?: boolean;
    readonly number?: boolean;
    readonly secure?: boolean;
    readonly error?: any;
    readonly style?: any;

}
interface LocaleState {
    readonly toggleSecure: boolean;
}
type Props = TextInputProps & OwnProps;
export default class Input extends Component<Props, LocaleState> {
    state = {
        toggleSecure: false,
    };

    renderLabel() {
        const { label, error } = this.props;

        return (
            <Block flex={false}>
                {label ? <Text gray2={!error} accent={error}>{label}</Text> : null}
            </Block>
        );
    }

    renderToggle() {
        const { secure, rightlabel: rightLabel } = this.props;
        const { toggleSecure } = this.state;

        if (!secure) {
            return null;
        }

        return (
            <Button
                style={styles.toggle}
                onPress={() => this.setState({ toggleSecure: !toggleSecure })}
            >
                {
                    rightLabel ? rightLabel :
                        <Ionicons
                            color={theme.colors.gray}
                            size={theme.sizes.font * 1.35}
                            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
                        />
                }
            </Button>
        );
    }

    renderRight() {
        const { rightlabel: rightLabel, rightstyle: rightStyle, onRightPress = () => 1 } = this.props;

        if (!rightLabel) {
            return null;
        }

        return (
            <Button
                style={[styles.toggle, rightStyle]}
                onPress={onRightPress}
            >
                {rightLabel}
            </Button>
        );
    }

    render() {
        const {
            email,
            phone,
            number,
            secure,
            error,
            style,
            ...props
        } = this.props;

        const { toggleSecure } = this.state;
        const isSecure = toggleSecure ? false : secure;

        const inputStyles = [
            styles.input,
            error && { borderColor: theme.colors.accent },
            style,
        ];

        const inputType = email
            ? 'email-address' : number
                ? 'numeric' : phone
                    ? 'phone-pad' : 'default';

        return (
            <Block flex={false} margin={[theme.sizes.base, 0]}>
                {this.renderLabel()}
                <TextInput
                    style={inputStyles}
                    secureTextEntry={isSecure}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={inputType}
                    {...props}
                />
                {this.renderToggle()}
                {this.renderRight()}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.black,
        borderRadius: theme.sizes.radius,
        fontSize: theme.sizes.font,
        fontWeight: '500',
        color: theme.colors.black,
        height: theme.sizes.base * 3,
    },
    toggle: {
        position: 'absolute',
        alignItems: 'flex-end',
        width: theme.sizes.base * 2,
        height: theme.sizes.base * 2,
        top: theme.sizes.base,
        right: 0,
    }
});