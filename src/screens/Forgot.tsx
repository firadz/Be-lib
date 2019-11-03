import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components/common';
import { theme } from '../constants';
import { NavigationScreenProp } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { isEmail } from '../constants/utils';
import firebase from 'firebase';

const VALID_EMAIL = 'fraoucene.guezout@gmail.com';

interface Props {
    readonly navigation: NavigationScreenProp<ForgotInternal>;
}

interface LocaleState {
    readonly email: string;
    readonly errorEmail: string;
    readonly errorAuth: string;
    readonly loading: boolean;
}

class ForgotInternal extends Component<Props, LocaleState> {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <Text bold white>Mode de passe oublié</Text>,
        headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={theme.sizes.icon} color={theme.colors.white} />
            </Button>
        ),
    })
    state = {
        email: VALID_EMAIL,
        errorEmail: '',
        errorAuth: '',
        loading: false,
    };

    handleForgot() {
        const { navigation } = this.props;
        const { email } = this.state;
        const errors = [];

        Keyboard.dismiss();
        this.setState({ loading: true });

        // check with backend API or with some static data
        if (!isEmail(email)) {
            this.setState({ errorEmail: 'Email not valide' });
        }

        this.setState({ loading: false });

        if (isEmail(email)) {
            this.onPasswordReset(email);
        }
    }
    onPasswordReset = async (email) => {
        const { navigation } = this.props;
        this.setState({ loading: true, errorAuth: '' });
        firebase.auth().sendPasswordResetEmail(email)
            .then(() =>
                Alert.alert(
                    'Password sent!',
                    'Please check you email.',
                    [
                        {
                            text: 'OK', onPress: () => {
                                navigation.navigate('Login');
                            }
                        }
                    ],
                    { cancelable: false }
                ),
                (error) => { this.setState({ errorAuth: error.message, loading: false }); }
            );
    }
    render() {
        const { navigation } = this.props;
        const { loading, errorAuth, errorEmail } = this.state;

        return (
            <KeyboardAvoidingView style={styles.forgot} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Block middle>
                        <Input
                            label="Email"
                            error={!!errorEmail}
                            style={[styles.input, !!errorEmail ? styles.hasErrors : null]}
                            defaultValue={this.state.email}
                            onChangeText={text =>
                                this.setState({ email: text, errorEmail: '' })}
                        />
                        <Text small color="red">{errorAuth}</Text>
                        <Text small color="red">{errorEmail}</Text>
                        <Button gradient onPress={() => this.handleForgot()}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Forgot</Text>
                            }
                        </Button>

                        <Button onPress={() => navigation.navigate('Login')}>
                            <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                                Back to Login
              </Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        );
    }
}

export const Forgot = ForgotInternal;
const styles = StyleSheet.create({
    forgot: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,
    }
});
