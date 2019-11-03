import React, { Component } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { NavigationScreenProp, StackActions, NavigationActions } from 'react-navigation';
import { Block, Button, Input, Text } from '../components/common';
import { theme } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { isEmail } from '../constants/utils';
import firebase from 'firebase';
import { getMaxListeners } from 'cluster';

interface Props {
    readonly navigation: NavigationScreenProp<SignUpInternal>;
}
interface LocaleState {
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly errorEmail: string;
    readonly errorPassword: string;
    readonly errorUsername: string;
    readonly errorAuth: string;
    readonly loading: boolean;
}

class SignUpInternal extends Component<Props, LocaleState> {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <Text bold white>Créaion de compte </Text>,
        headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={theme.sizes.icon} color={theme.colors.white} />
            </Button>
        ),
    })
    state = {
        email: 'fraoucene@gmail.com',
        username: 'fraoucene',
        password: null,
        errorEmail: '',
        errorPassword: '',
        errorUsername: '',
        errorAuth: '',
        loading: false,
    };

    handleSignUp() {
        const { email, username, password } = this.state;

        Keyboard.dismiss();

        if (!isEmail(email)) {
            this.setState({ errorEmail: 'Email not valide' });
        }
        if (password.length <= 3) {
            this.setState({ errorPassword: 'Mot de pass non valide' });
        }
        if (username.length <= 3) {
            this.setState({ errorUsername: 'Username non valide' });
        }

        if (isEmail(email) && password.length > 3 && username.length > 3) {
            this.onSignUp();
        }
    }

    onSignUp = () => {
        this.setState({ errorAuth: '' });
        const { navigation } = this.props;
        this.setState({ loading: true });
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'PlugsList' })],
                });
                navigation.dispatch(resetAction);
                this.setState({ loading: false });
            },
                (error) => { this.setState({ errorAuth: error.message, loading: false }); });
    }

    render() {
        const { navigation } = this.props;
        const { loading, errorAuth, errorPassword, errorEmail, errorUsername } = this.state;

        return (
            <KeyboardAvoidingView style={styles.signup} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Block middle>
                        <Input
                            email
                            label="Email"
                            error={!!errorEmail}
                            style={[styles.input, !!errorEmail ? styles.hasErrors : null]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text, errorEmail: '' })}
                        />
                        <Input
                            label="Username"
                            error={!!errorUsername}
                            style={[styles.input, !!errorUsername ? styles.hasErrors : null]}
                            defaultValue={this.state.username}
                            onChangeText={text => this.setState({ username: text, errorUsername: '' })}
                        />
                        <Input
                            secure
                            label="Password"
                            error={!!errorPassword}
                            style={[styles.input, !!errorPassword ? styles.hasErrors : null]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text, errorPassword: '' })}
                        />
                        <Text small color="red">{errorAuth}</Text>
                        <Text small color="red">{errorUsername}</Text>
                        <Text small color="red">{errorEmail}</Text>
                        <Text small color="red">{errorPassword}</Text>
                        <Button gradient onPress={() => this.handleSignUp()}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Sign Up</Text>
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

export const SignUp = SignUpInternal;
const styles = StyleSheet.create({
    signup: {
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
