import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { setPlug } from '../actions/plug';
import { Plug } from '../beans/plug';
import { theme } from '../constants';
import { Block, Card, Text } from './common';

const { width } = Dimensions.get('window');

interface OwnProps {
    readonly plug: Plug;
    readonly navigation: NavigationScreenProp<any>;
}
interface DispatchProps {
    readonly setPlug: (pl: Plug) => void;
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    setPlug: (pl: Plug) => dispatch(setPlug(pl))
});

type Props = OwnProps & DispatchProps;
export const PlugCardInternal = ({ plug, navigation, setPlug }: Props) => {
    const { adresse } = plug;
    return <TouchableOpacity
        key={plug.id}
        onPress={() => {
            setPlug(plug);
            navigation
                .navigate('PlugDetail', { model: plug.getCaracteristique().name });
            }
        }
    >

        <Card middle shadow style={styles.card}>
            <Block style={styles.star}>
                <FontAwesome
                    name="star-o"
                    onPress={() => alert('Ajouter au favoris')}
                    size={theme.sizes.icon / 2}
                    color={theme.colors.primary} />
            </Block>
            <Block row>
                <Block flex={0.2}  middle>
                    <FontAwesome name="map-marker"
                        size={theme.sizes.icon}
                        color={theme.colors.primary} />
                </Block>
                <Block column>
                    <Block row margin={[0, 0, theme.sizes.margin, 0]}>
                        <Text medium caption>{adresse.toString()}</Text>
                    </Block>
                    <Block>
                        <Text gray small>Model:  {plug.model} </Text>
                        <Text gray small>Distance: {3.4} Km </Text>
                    </Block>
                </Block>
                <Block column flex={0.3}>
                    <Block center middle>
                        <FontAwesome name="circle"
                            size={theme.sizes.icon / 2.5}
                            color={plug.statut === 'Disponible' ? theme.colors.green : theme.colors.red} />
                        <Text center gray size={9}>{plug.statut}</Text>
                    </Block>
                </Block>
            </Block>
        </Card>
    </TouchableOpacity>;
};

export const PlugCard = connect(null, mapDispatchToProps)(PlugCardInternal);

const styles = StyleSheet.create({
    star: {
        position: 'absolute',
        top: theme.sizes.margin,
        right: theme.sizes.margin
    },
    card: {
        minWidth: (width - theme.sizes.margin * 2),
        maxWidth: (width - theme.sizes.margin * 2),
    },
});