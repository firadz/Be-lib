import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import React, { Component } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationActions, StackActions } from 'react-navigation';
import { Block, Button, Input, Text } from '../components/common';
import { theme } from '../constants';
import { isEmail } from '../constants/utils';

const VALID_EMAIL = 'fraoucene@gmail.com';
const VALID_PASSWORD = 'rootroot';

interface Props {
    readonly navigation: NavigationScreenProp<LoginInternal>;
}

interface LocaleState {
    readonly email: string;
    readonly password: string;
    readonly errorEmail: string;
    readonly errorPassword: string;
    readonly errorAuth: string;
    readonly loading: boolean;
}

class LoginInternal extends Component<Props, LocaleState> {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <Text bold white>Login</Text>,
        headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={theme.sizes.icon} color={theme.colors.white} />
            </Button>
        ),
    })
    state = {
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
        errorEmail: '',
        errorPassword: '',
        errorAuth: '',
        loading: false,
    };

    handleLogin() {
        const { email, password } = this.state;

        Keyboard.dismiss();
        if (!isEmail(email)) {
            this.setState({ errorEmail: 'Email not valide' });
        }
        if (password.length <= 3) {
            this.setState({ errorPassword: 'Mot de pass not valide' });
        }

        if (isEmail(email) && password.length > 3) {
            this.onLogin();
        }
    }

    onLogin = () => {
        const { navigation } = this.props;
        const { email, password } = this.state;

        this.setState({ loading: true, errorAuth: '' });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'PlugsList' })],
                });
                navigation.dispatch(resetAction);
            },
                (error) => { this.setState({ errorAuth: error.message, loading: false }); });
    }

    render() {
        const { navigation } = this.props;
        const { loading, errorAuth, errorPassword, errorEmail } = this.state;

        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
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
                        <Input
                            secure
                            label="Mode de passe"
                            error={!!errorPassword}
                            style={[styles.input, !!errorPassword ? styles.hasErrors : null]}
                            defaultValue={this.state.password}
                            onChangeText={text =>
                                this.setState({ password: text, errorPassword: '' })}
                        />
                        <Text small color="red">{errorAuth}</Text>
                        <Text small color="red">{errorEmail}</Text>
                        <Text small color="red">{errorPassword}</Text>
                        <Button gradient onPress={() => this.handleLogin()}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Login</Text>
                            }
                        </Button>

                        <Button onPress={() => navigation.navigate('Forgot')}>
                            <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                                Mot de passe oublié?
                            </Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        );
    }
}

export const Login = LoginInternal;

const styles = StyleSheet.create({
    login: {
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
