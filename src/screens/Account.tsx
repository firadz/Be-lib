import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { NavigationScreenProp, StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Block, Button, Text, Card, Divider } from '../components/common';
import { theme } from '../constants';
import firebase from 'firebase';

const { width } = Dimensions.get('window');

interface NavigationProps {
    readonly navigation: NavigationScreenProp<AccountInternal>;
}

interface StateProps {
}

const mapStateToProps = (): StateProps => ({
});

type Props = NavigationProps & StateProps;
class AccountInternal extends Component<Props> {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <Text h3 bold white>Mon compte</Text>,
        headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={theme.sizes.icon} color={theme.colors.white} />
            </Button>
        ),
    })

    onSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
                });
                this.props.navigation.dispatch(resetAction);
            });
    }

    renderItems = () => {
        return <Card middle shadow style={styles.card}>
            <Block row flex={1} margin={theme.sizes.margin} middle>
                <Block flex={0.15}>
                    <FontAwesome
                        name="cog"
                        size={theme.sizes.icon}
                        color={theme.colors.gray} />
                </Block>
                <Block flex={0.75} middle>
                    <Text gray>Mes péferences</Text>
                </Block>
                <Block flex={0.1} style={styles.right}>
                    <FontAwesome
                        name="chevron-right"
                        size={theme.sizes.icon}
                        color={theme.colors.gray} />
                </Block>
            </Block>
            <Divider />
            <Block row flex={1} margin={theme.sizes.margin} middle>
                <Block flex={0.15}>
                    <FontAwesome
                        name="heart"
                        size={theme.sizes.icon}
                        color={theme.colors.gray} />
                </Block>
                <Block flex={0.75} middle>
                    <Text gray>Favoris</Text>
                </Block>
                <Block flex={0.1} style={styles.right}>
                    <FontAwesome
                        name="chevron-right"
                        size={theme.sizes.icon}
                        color={theme.colors.gray} />
                </Block>
            </Block>
            <Divider />
            <Block row flex={1} margin={theme.sizes.margin} middle>
                <Block flex={0.15}>
                    <FontAwesome5
                        name="route"
                        size={theme.sizes.icon}
                        color={theme.colors.gray} />
                </Block>
                <Block flex={0.75} middle>
                    <Text gray>Mes trajets</Text>
                </Block>
                <Block flex={0.1} style={styles.right}>
                    <FontAwesome
                        name="chevron-right"
                        size={theme.sizes.icon}
                        color={theme.colors.gray} />
                </Block>
            </Block>
            <Divider />
            <Block row flex={1} margin={theme.sizes.margin} middle>
                <Block flex={0.15}>
                    <FontAwesome
                        name="info-circle"
                        size={theme.sizes.icon}
                        color={theme.colors.gray} />
                </Block>
                <Block flex={0.75} middle>
                    <Text gray>A propos</Text>
                </Block>
                <Block flex={0.1} style={styles.right}>
                    <FontAwesome
                        name="chevron-right"
                        size={theme.sizes.icon}
                        color={theme.colors.gray} />
                </Block>
            </Block>
        </Card>;
    }

    render() {
        const user = firebase.auth().currentUser;
        const imgSource = !!user.photoURL ? { uri: user.photoURL } : require(`../../assets/images/avatar.png`);
        return (
            <ScrollView
            >
                <Block flex={false} style={styles.container}>
                    <Card middle shadow style={styles.card}>
                        <Block row margin={theme.sizes.margin}>
                            <Image
                                source={require(`../../assets/images/voiture.png`)}
                                style={styles.img}
                            />
                        </Block>
                        <Block row>
                            <Image
                                source={imgSource}
                                style={styles.profile}
                            />
                            <Block margin={theme.sizes.margin * 2} middle>
                                <Text h3 bold>{user.displayName}</Text>
                                <Text gray bold small>{user.email}</Text>
                                <Text gray bold small>Aucun véhicule séléctioné</Text>
                            </Block>
                        </Block>
                    </Card>
                    {this.renderItems()}
                    <Button shadow onPress={this.onSignOut} color="primary">
                        <Text center semibold white>Se déconnecter</Text>
                    </Button>
                </Block>
            </ScrollView>
        );
    }
}

export const Account = connect(mapStateToProps)(AccountInternal);

const styles = StyleSheet.create({
    container: {
        paddingVertical: theme.sizes.margin,
        paddingHorizontal: theme.sizes.margin,
    },
    header: {
        paddingHorizontal: theme.sizes.base * 2,
    },
    card: {
        minWidth: (width - theme.sizes.margin * 2),
        maxWidth: (width - theme.sizes.margin * 2),
    },
    img: {
        height: theme.sizes.base * 8,
        width: (width - theme.sizes.margin * 8),
    },
    right: {
        alignItems: 'flex-end',
    },
    profile: {
        height: theme.sizes.base * 6,
        width: theme.sizes.base * 6,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: theme.sizes.base * 6,
    }
});