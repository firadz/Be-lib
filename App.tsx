import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { Navigator } from './src/navigation/index';

import firebase from 'firebase';
import { fireBaseConfig } from './src/firebase/config';

firebase.initializeApp(fireBaseConfig);
export default function App() {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
