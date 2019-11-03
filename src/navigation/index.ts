import { SignUp } from './../screens/SignUp';
import { Forgot } from './../screens/Forgot';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { theme } from '../constants';
import { Account } from '../screens/Account';
// import { Map } from './../screens/Map';
import { PlugsList } from '../screens/PlugsList';
import { Login } from './../screens/Login';
import { PlugDetail } from './../screens/PlugDetail';
import { Welcome } from './../screens/Welcome';

const screens = createStackNavigator({
    Welcome,
    Login,
    SignUp,
    Forgot,
    PlugsList,
    Account,
    PlugDetail,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            height: theme.sizes.base * 3,
            backgroundColor: theme.colors.primary, // or 'white
            borderBottomColor: 'transparent',
            elevation: 0, // for android
        },
        // headerBackImage: () => <MaterialIcons name="keyboard-arrow-left"
        //     size={theme.sizes.icon} color={theme.colors.white} />,
        headerBackTitle: null,
        headerLeftContainerStyle: {
            alignItems: 'center',
            marginLeft: theme.sizes.base,
            // color: 'white'
            // paddingRight: theme.sizes.base,
        },
        headerRightContainerStyle: {
            alignItems: 'center',
            paddingRight: theme.sizes.base,
        },
    }
});

export const Navigator = createAppContainer(screens);