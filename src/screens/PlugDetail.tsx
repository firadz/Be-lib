import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { Block, Button, Text, Card } from '../components/common';
import { theme } from '../constants';
import { Plug } from '../beans/plug';
import { State } from '../reducers';
import { PlugImage } from '../components/common/PlugImage';

const { width } = Dimensions.get('window');

interface NavigationProps {
    readonly navigation: NavigationScreenProp<PlugDetailInternal>;
}

interface StateProps {
    readonly plug: Plug;
}

const mapStateToProps = (state: State): StateProps => ({
    plug: state.plug
});

type Props = NavigationProps & StateProps;
class PlugDetailInternal extends Component<Props> {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <Text bold white>Prise - {navigation.getParam('model')}</Text>,
        headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={theme.sizes.icon} color={theme.colors.white} />
            </Button>
        ),
    })

    private renderPluGCard = () => {
        const { plug } = this.props;
        return <Card middle shadow style={styles.card}>
            <Block style={styles.bookmark}>
                <FontAwesome
                    name="star-o"
                    onPress={() => alert('Ajouter au favoris')}
                    size={theme.sizes.icon / 2}
                    color={theme.colors.primary} />
            </Block>
            <PlugImage plug={plug} />
            <Block style={styles.statut} center>
                <Block>
                    <FontAwesome name="circle"
                        size={theme.sizes.icon / 2}
                        color={plug.statut === 'Disponible' ?
                            theme.colors.green : theme.colors.red} />
                </Block>
                <Block>
                    <Text gray bold size={9}>{plug.statut}</Text>
                </Block>
            </Block>
            <Block center margin={[theme.sizes.margin, 0, theme.sizes.margin * 2, 0]}>
                <Text bold>Type de prise - {plug.getCaracteristique().name}</Text>
            </Block>
            <Block column margin={[0, theme.sizes.margin * 5, 0, theme.sizes.margin * 5]}>
                <Block row space="between">
                    <Text gray caption>Mode de sortie:</Text>
                    <Text gray caption>{plug.getCaracteristique().modeSortie}</Text>
                </Block>
                <Block row space="between">
                    <Text gray caption>Type de courant:</Text>
                    <Text gray caption>{plug.getCaracteristique().typeCourant}</Text>
                </Block>
                <Block row space="between">
                    <Text gray caption>Tension maxi:</Text>
                    <Text gray caption>{plug.getCaracteristique().tensionMaxi}</Text>
                </Block>
                <Block row space="between">
                    <Text gray caption>Courant maxi:</Text>
                    <Text gray caption>{plug.getCaracteristique().courantMaxi}</Text>
                </Block>
                <Block row space="between">
                    <Text gray caption>Puissance maxi:</Text>
                    <Text gray caption>{plug.getCaracteristique().puissanceMaxi}</Text>
                </Block>
            </Block>
        </Card>;
    }

    private renderAdresseCard = () => {
        const { plug, navigation } = this.props;
        return <Card middle shadow style={styles.card}>
            <Block margin={[0, 0, theme.sizes.margin * 2, 0]}>
                <Text primary bold>Adresse</Text>
            </Block>
            <Block row margin={theme.sizes.margin}>
                <FontAwesome name="map-marker"
                    size={theme.sizes.icon / 1.5}
                    color={theme.colors.primary} />
                <Block margin={theme.sizes.margin} flex={false} />
                <Block>
                    <Text gray caption>{plug.adresse.toString()}</Text>
                </Block>
            </Block>
            <Block row margin={theme.sizes.margin}>
                <FontAwesome name="phone"
                    size={theme.sizes.icon / 1.5}
                    color={theme.colors.primary} />
                <Block margin={theme.sizes.margin} flex={false} />
                <Block>
                    <Text gray caption>+336 526 886 12</Text>
                </Block>
            </Block>
            <TouchableOpacity
                onPress={() => {
                    navigation
                        .navigate('Map');
                    }
                }
            >
                <Image
                    source={require(`../../assets/images/map.png`)}
                    style={styles.map}
                />
            </TouchableOpacity>
        </Card>;
    }

    private renderInfoCard = () => {
        return <Card middle shadow style={styles.card}>
            <Block margin={[0, 0, theme.sizes.margin * 2, 0]}>
                <Text primary bold>Cout</Text>
            </Block>
            <Block row margin={[0, theme.sizes.margin]}>
                <Block>
                    <Text gray caption>S’il vous plait consulter le site
                     Internet pour obtenir des renseignementssur les frais.</Text>
                </Block>
            </Block>
            <Block margin={[theme.sizes.margin * 2, 0, theme.sizes.margin * 2, 0]}>
                <Text primary bold>Horaires</Text>
            </Block>
            <Block row margin={[0, theme.sizes.margin]}>
                <Block>
                    <Text gray caption>Ouvert 24h/24h 7/7.</Text>
                </Block>
            </Block>
            <Block margin={[theme.sizes.margin * 2, 0, theme.sizes.margin * 2, 0]}>
                <Text primary bold>Déscription</Text>
            </Block>
            <Block row margin={[0, theme.sizes.margin]}>
                <Block>
                    <Text gray caption>Réservé aux membres. Badge doit étre commandé. Autolib.
                        <Text primary caption bold> http://www.autolib.fr</Text>
                        .</Text>
                </Block>
            </Block>
        </Card>;
    }
    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Block flex={false} style={styles.container}>
                    {this.renderPluGCard()}
                    {this.renderAdresseCard()}
                    {this.renderInfoCard()}
                </Block>
            </ScrollView>
        );
    }
}

export const PlugDetail = connect(mapStateToProps)(PlugDetailInternal);

const styles = StyleSheet.create({
    container: {
        paddingVertical: theme.sizes.margin,
        paddingHorizontal: theme.sizes.margin,
    },
    statut: {
        position: 'absolute',
        top: theme.sizes.margin * 2,
        right: theme.sizes.margin * 2,
    },
    bookmark: {
        position: 'absolute',
        top: theme.sizes.margin,
        left: theme.sizes.margin,
    },
    card: {
        minWidth: (width - theme.sizes.margin * 2),
        maxWidth: (width - theme.sizes.margin * 2),
    },
    map: {
        height: theme.sizes.base * 6,
        width: (width - theme.sizes.margin * 7),
        margin: 0,
        borderRadius: theme.sizes.radius
    }
});