import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { setPlug, setSearch } from '../actions/plug';
import { Plug } from '../beans/plug';
import { Block, Button, Text, Input } from '../components/common';
import { PlugCard } from '../components/PlugCard';
import { theme } from '../constants';
import { State } from '../reducers';

const { width } = Dimensions.get('window');

interface NavigationProps {
    readonly navigation: NavigationScreenProp<MapInternal>;
}

interface StateProps {
    readonly plugs: ReadonlyArray<Plug>;
    readonly plug: Plug;
    readonly search: string;
}
interface DispatchProps {
    readonly setPlug: (pl: Plug) => void;
    readonly setSearch: (search: string) => void;
}

const mapStateToProps = (state: State): StateProps => ({
    plugs: state.plugs,
    plug: state.plug,
    search: state.search,
});
const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    setPlug: (pl: Plug) => dispatch(setPlug(pl)),
    setSearch: (search: string) => dispatch(setSearch(search)),

});

type Props = NavigationProps & StateProps & DispatchProps;
class MapInternal extends Component<Props> {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <Text h3 bold white>Belib Bornes</Text>,
        headerRight: () => (
            <Button onPress={() => navigation.navigate('Account')}>
                <MaterialIcons name="account-circle" size={theme.sizes.icon} color={theme.colors.white} />
            </Button>
        ),
        headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={theme.sizes.icon} color={theme.colors.white} />
            </Button>
        ),
    })

    renderSearch() {
        const { search, setSearch } = this.props;
        return (
            <Block animated middle flex={1} style={styles.search}>
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
        const { navigation, plugs, plug, setPlug } = this.props;
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    {this.renderSearch()}
                    <Button onPress={() => navigation.navigate('PlugsList')}>
                        <FontAwesome name="list" size={theme.sizes.icon} color={theme.colors.primary} />
                    </Button>
                </Block>
                <MapView
                    showsPointsOfInterest={false}
                    showsCompass={false}
                    showsBuildings={false}
                    showsTraffic={false}
                    initialRegion={{
                        latitude: plug.adresse.lat,
                        longitude: plug.adresse.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.map}
                >
                    {plugs.map(pl => (
                        <Marker
                            onPress={() => setPlug(pl)}
                            key={`marker-${pl.id}`}
                            coordinate={{
                                latitude: pl.adresse.lat,
                                longitude: pl.adresse.lng,
                            }}
                        >
                            <FontAwesome name="map-marker" size={theme.sizes.icon}
                                color={pl.statut === 'Disponible' ? theme.colors.green : theme.colors.red} />
                        </Marker>
                    ))}
                </MapView>
                <Block style={styles.card}>
                    <PlugCard plug={plug} navigation={navigation} />
                </Block>
            </Block>
        );
    }
}

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapInternal);

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base,
    },
    // container: {
    //     flex: 1,
    // },
    map: {
        flex: 3,
    },
    card: {
        position: 'absolute',
        bottom: theme.sizes.margin * 2,
        left: theme.sizes.margin,
        backgroundColor: theme.colors.white,
        padding: 0,
    },
    search: {
        width: width - theme.sizes.base,
        borderRadius: theme.sizes.radius,
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
});