import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { setSearch } from '../actions/plug';
import { Plug } from '../beans/plug';
import { Block, Button, Input, Text } from '../components/common';
import { PlugCard } from '../components/PlugCard';
import { theme } from '../constants';
import { colors } from '../constants/theme';
import { State } from '../reducers';
import { getPlugsFiltred } from '../reducers/selectors';
import firebase from 'firebase';

const { width } = Dimensions.get('window');

interface NavigationProps {
    readonly navigation: NavigationScreenProp<PlugsListInternal>;
}

interface StateProps {
    readonly plug: Plug;
    readonly plugs: ReadonlyArray<Plug>;
    readonly search: string;
}
interface DispatchProps {
    readonly setSearch: (search: string) => void;
}

const mapStateToProps = (state: State): StateProps => ({
    plug: state.plug,
    plugs: getPlugsFiltred(state),
    search: state.search,
});
const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    setSearch: (search: string) => dispatch(setSearch(search)),
});

type Props = NavigationProps & StateProps & DispatchProps;
class PlugsListInternal extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        const user = firebase.auth().currentUser;
        const imgSource = !!user.photoURL ? { uri: user.photoURL } : require(`../../assets/images/avatar.png`);
        return {
            headerTitle: () => <Text bold white>Belib Bornes</Text>,
            headerRight: () => (
                <Button onPress={() => navigation.navigate('Account')}>
                    <Image
                        source={imgSource}
                        style={styles.profile}
                    />
                </Button>
            ),
            headerLeft: () => (
                <Button onPress={() => navigation.goBack()}>
                    <MaterialIcons name="keyboard-arrow-left" size={theme.sizes.icon} color={theme.colors.white} />
                </Button>
            ),
        };
    }

    renderSearch() {
        const { search, setSearch } = this.props;
        return (
            <Block animated middle flex={1} style={styles.search} margin={theme.sizes.margin}>
                <Input
                    placeholder="Chercher"
                    placeholderTextColor={theme.colors.gray2}
                    style={styles.searchInput}
                    onChangeText={text => setSearch(text)}
                    value={search}
                    onRightPress={() => setSearch('')}
                    rightstyle={styles.searchRight}
                    rightlabel={
                        <FontAwesome
                            name={!!search ? 'close' : 'search'}
                            size={theme.sizes.icon / 2}
                            color={theme.colors.gray2}
                            style={styles.searchIcon}
                        />
                    }
                />
            </Block>
        );
    }

    render() {
        const { navigation, plugs } = this.props;

        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    {this.renderSearch()}
                    <Button onPress={() => navigation.navigate('Map')}>
                        <FontAwesome5 name="map-marked" size={theme.sizes.icon} color={theme.colors.primary} />
                    </Button>
                </Block>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Block flex={false} row space="between" style={styles.plugs}>
                        {plugs.map((pl: Plug) => <PlugCard key={pl.id} plug={pl} navigation={navigation} />)}
                    </Block>
                </ScrollView>
            </Block>
        );
    }
}

export const PlugsList = connect(mapStateToProps, mapDispatchToProps)(PlugsListInternal);

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base / 2,
    },
    plugs: {
        flexWrap: 'wrap',
        paddingHorizontal: theme.sizes.margin,
    },
    search: {
        width: width - theme.sizes.base * 2,
        borderRadius: theme.sizes.radius
    },
    searchInput: {
        fontSize: theme.sizes.body,
        height: theme.sizes.base * 2,
        backgroundColor: theme.colors.light,
        borderColor: theme.colors.light,
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5,
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: 'transparent'
    },
    searchIcon: {
        position: 'absolute',
        right: theme.sizes.base / 2,
    },
    profile: {
        height: theme.sizes.icon * 1.5,
        width: theme.sizes.icon * 1.5,
        borderRadius: theme.sizes.base * 6,
        marginRight: 0,
    },
});
