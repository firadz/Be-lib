import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
// import { LinearGradient } from 'expo';
import { theme } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { ICOLORS, Point } from '../../constants/interfaces';

interface OwnProps {
    readonly style?: any;
    readonly opacity?: number;
    readonly gradient?: boolean;
    readonly shadow?: boolean;
    readonly color?: ICOLORS;
    readonly costumColor?: string;
    readonly startColor?: string;
    readonly endColor?: string;
    readonly start?: Point | null;
    readonly end?: Point | null;
    readonly locations?: number[] | null;
    readonly colors?: string[];
}

type Props = TouchableOpacityProps & OwnProps;

class Button extends Component<Props> {
    static defaultProps = {
        endColor: theme.colors.secondary,
        startColor: theme.colors.primary,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        locations: [0.1, 0.9],
        opacity: 0.8,
        color: theme.colors.primary,
    };
    render() {
        const {
            style,
            opacity,
            gradient,
            color,
            costumColor,
            startColor,
            endColor,
            end,
            start,
            locations,
            shadow,
            children,
            ...props
        } = this.props;

        const buttonStyles = [
            styles.button,
            shadow && styles.shadow,
            color && styles[color], // predefined styles colors for backgroundColor
            costumColor && { backgroundColor: costumColor }, // custom backgroundColor
            style,
        ];

        if (gradient) {
            return (
                <TouchableOpacity
                    style={buttonStyles}
                    activeOpacity={opacity}
                    {...props}
                >
                    <LinearGradient
                        start={start}
                        end={end}
                        locations={locations}
                        style={buttonStyles}
                        colors={[startColor, endColor]}
                    >
                        {children}
                    </LinearGradient>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={buttonStyles}
                activeOpacity={opacity || 0.8}
                {...props}
            >
                {children}
            </TouchableOpacity>
        );
    }
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.sizes.radius,
        height: theme.sizes.base * 3,
        justifyContent: 'center',
        marginVertical: theme.sizes.padding / 3,
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    accent: { backgroundColor: theme.colors.accent, },
    primary: { backgroundColor: theme.colors.primary, },
    secondary: { backgroundColor: theme.colors.secondary, },
    tertiary: { backgroundColor: theme.colors.tertiary, },
    black: { backgroundColor: theme.colors.black, },
    white: { backgroundColor: theme.colors.white, },
    gray: { backgroundColor: theme.colors.gray, },
    gray2: { backgroundColor: theme.colors.gray2, },
    gray3: { backgroundColor: theme.colors.gray3, },
});