import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Block } from '.';
import { Plug } from '../../beans/plug';
import { theme } from '../../constants';

interface OwnProps {
    readonly plug: Plug;
}
export const PlugImage = ({ plug }: OwnProps) => {
    return <Block style={styles.block} center middle flex={1}>
        <Image
            source={plug.getCaracteristique().image}
            style={styles.image}
        />
    </Block>;
};

const styles = StyleSheet.create({
    block: {
        alignSelf: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.sizes.base * 6,
        padding: theme.sizes.margin,
    },
    image: {
        height: theme.sizes.base * 5,
        width: theme.sizes.base * 5,
    },
});