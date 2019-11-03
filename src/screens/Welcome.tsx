import React, { Component } from 'react';
import { Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';

import { Button, Block, Text } from '../components/common';
import { theme } from '../constants';
import { NavigationScreenProp, StackActions, NavigationActions } from 'react-navigation';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');

const illustrations = [
    { id: 1, source: require('../../assets/images/illustration_1.png') },
    { id: 2, source: require('../../assets/images/illustration_2.png') },
    { id: 3, source: require('../../assets/images/illustration_3.png') },
];

interface Props {
    readonly navigation: NavigationScreenProp<WelcomeInternal>;
}
interface LocaleState {
    readonly showTerms: boolean;
    readonly loading: boolean;
    readonly loadingGoogle: boolean;
}
// GoogleSignin.configure({
//     webClientId: '159038390060-3129473feovkmm6jlg5m6a522nv871h4.apps.googleusercontent.com',
//     offlineAccess: true
// });
class WelcomeInternal extends Component<Props, LocaleState> {

    constructor(props: Props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
    };

    scrollX = new Animated.Value(0);

    state = {
        showTerms: false,
        loading: false,
        loadingGoogle: false,
    };

    componentDidMount() {
        this.checkIfLogged();
    }
    renderTermsService() {
        return (
            <Modal animationType="slide"
                visible={this.state.showTerms} onRequestClose={() => this.setState({ showTerms: false })}>
                <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]} space="between">
                    <Text h2 primary>BELIB' - MENTIONS LÉGALES -
                     CONDITIONS GÉNÉRALES D’UTILISATION-DONNÉES PERSONNELLES</Text>

                    <ScrollView style={{ marginVertical: theme.sizes.padding }}>
                        <Text h3 light>Informations légales</Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`1. ZIVIA, société anonyme, au capital de 3 197 568 euros, immatriculée au Registre du Commerce et des Sociétés de Nanterre sous le numéro 419 070 180 et dont le siège social est sis Immeuble Colisée – La Défense, 8 avenue de l’Arche à Courbevoie (92419), n° TVA intracommunautaire FR 51 419070180 - Tél. 0.186.958.075 (appel non surtaxé), pour l’architecture du portail proprement dit ;`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`2. La Ville de PARIS pour ce qui concerne la marque et la charte graphique « BELIB’ ».`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`3. Le Directeur de publication des Services est Juliette ANTOINE-SIMON en qualité de Directrice Générale de IZIVIA.`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`4. Le Site a été conçu et l’application ont été conçue par la SARL 4SH - 6, Place de la Madeleine, 75008 Paris et est hébergé sur les matériels informatiques de la société Iliad, société anonyme immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro : B 342 376 332 et située à 8, rue de La-Ville-L'Evêque, 75008 Paris. L’Application a été conçue par la SARL 4SH – 6, Place de la Madeleine, 75008 Paris et est disponible sur les plateformes Apple Store et Google Play.`}
                        </Text>
                        <Text h3 light>Conditions Générales d’Utilisation</Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`1. L’utilisateur doit accepter les présentes Conditions pour utiliser les Services et le cas échéant créer un espace personnel. Si l’utilisateur n’a pas d’espace personnel, il accepte les présentes Conditions en visitant le Site ou en utilisant l’Application. Si l’utilisateur n’accepte pas les présentes conditions, il doit veiller à ne pas créer d’espace personnel, ne pas utiliser les Services. `}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`2. IZIVIA se réserve le droit de modifier la présente notice à tout moment. L'utilisateur est donc invité à la consulter régulièrement.`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`3. L’accès aux Services est possible 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d’un événement hors du contrôle de IZIVIA et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement des Services et des matériels nécessaires à leur disponibilité. L’accès aux Services se fait à partir d’un terminal (ordinateurs, tablettes et téléphones mobiles) connecté à un réseau de télécommunication permettant l’accès aux Services. Les protocoles de communication utilisés sont ceux en usage sur le réseau d’Internet.`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`4. Les Services donnent accès à d’autres sites, susceptibles de disposer de leurs propres notices légales, qu’il convient de consulter et de respecter.`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`5. Dans l'hypothèse où l’utilisateur accéderait aux Services à partir d'un autre Etat que la France, il s’engage à s’assurer également du respect de la législation localement applicable.`}
                        </Text>
                        <Text h3 light>Propriété intellectuelle</Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`1. La structure générale, ainsi que les logiciels, noms de domaine, textes, images animées ou non, vidéos, sons, savoir-faire et tout autre élément composant les Services sont la propriété exclusive de IZIVIA ou de la Ville de PARIS ou font l'objet d'un droit d'utilisation ou d'exploitation s’agissant des éléments relatifs aux partenaires ou prestataires de IZIVIA figurant sur les Services. Ces éléments sont soumis à la législation protégeant le droit d'auteur.`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`2. Toute représentation, modification, reproduction, dénaturation, totale ou partielle, par quelque procédé que ce soit et sur quelque support que ce soit des Services, sans l'autorisation expresse et préalable de IZIVIA ou de la Ville de PARIS est interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`3. Les bases de données figurant, le cas échéant, sur les Services sont protégées par les dispositions de la loi du 1er juillet 1998 transposant dans le Code de la Propriété Intellectuelle la Directive Européenne du 11 mars 1996 relative à la protection juridique des bases de données. A ce titre, est expressément interdite toute réutilisation, reproduction ou extraction d'éléments de ces bases de données. La réutilisation, reproduction ou extraction non autorisée engage la responsabilité de l'utilisateur.`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`4. Les marques de IZIVIA et de la Ville de PARIS, de leurs prestataires et de leurs partenaires figurant sur les Services sont des marques déposées. Toute reproduction totale ou partielle de ces marques sans autorisation expresse de IZIVIA, de la Ville de PARIS, de leurs prestataires ou de leurs partenaires est donc prohibée au sens des articles L.713-2 et suivants du Code de la Propriété Intellectuelle.`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`5. IZIVIA se réserve la faculté de supprimer sans délais, et sans mise en demeure préalable, tout contenu (message, texte, image, graphique, ...) qui contreviendrait aux lois et règlements en vigueur et notamment les réglementations précisées ci-dessus.`}
                        </Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`6. Dans l'hypothèse où l’Utilisateur souhaiterait utiliser un des contenus du site (texte, image...), il doit obtenir l'autorisation écrite, expresse et préalable de IZIVIA et / ou de la Ville de PARIS, en écrivant à l'adresse indiquée dans cet onglet «http://belib.paris/portal/#/contact».`}
                        </Text>
                        <Text h3 light>Droit applicable</Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`Le droit applicable au Site est le droit français.`}
                        </Text>
                        <Text h3 light>Crédits photographiques</Text>
                        <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
                            {`Application Belib' mobile : Izivia, Ville de Paris`}
                        </Text>
                    </ScrollView>

                    <Block middle padding={[theme.sizes.base / 2, 0]}>
                        <Button gradient onPress={() => this.setState({ showTerms: false })}>
                            <Text center white>I understand</Text>
                        </Button>
                    </Block>
                </Block>
            </Modal>
        );
    }

    renderIllustrations() {

        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={illustrations}
                // extraDate={this.state}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => (
                    <Image
                        source={item.source}
                        resizeMode="contain"
                        style={{ width, height: height / 2, overflow: 'visible' }}
                    />
                )}
                onScroll={
                    Animated.event([{
                        nativeEvent: { contentOffset: { x: this.scrollX } }
                    }])
                }
            />
        );
    }

    renderSteps() {
        const stepPosition = Animated.divide(this.scrollX, width);
        return (
            <Block row center middle style={styles.stepsContainer}>
                {illustrations.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Block
                            animated
                            flex={false}
                            key={`step-${index}`}
                            color="gray"
                            style={[styles.steps, { opacity }]}
                        />
                    );
                })}
            </Block>
        );
    }

    checkIfLogged = () => {
        const { navigation } = this.props;
        this.setState({ loading: true });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'PlugsList' })],
                });
                navigation.dispatch(resetAction);
                // this.setState({ loading: false });
            } else {
                this.setState({ loading: false });
            }
        });
    }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData;
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.id) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    onSignIn = (result) => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = firebase.auth()
            .onAuthStateChanged((firebaseUser) => {
                unsubscribe();
                // Check if we are already signed-in Firebase with the correct user.
                if (!this.isUserEqual(result.user, firebaseUser)) {
                    // Build Firebase credential with the Google ID token.
                    const credential = firebase.auth.GoogleAuthProvider.credential(
                        result.idToken,
                        result.accessToken,
                    );
                    // Sign in with credential from the Google user.
                    firebase
                        .auth()
                        .signInWithCredential(credential)
                        .then((res) => {
                            const profile = res.additionalUserInfo.profile as any;
                            if (res.additionalUserInfo.isNewUser) {
                                firebase
                                    .database()
                                    .ref('/users' + profile.sub)
                                    .set({
                                        gmail: profile.email,
                                        last_name: profile.family_name,
                                        first_name: profile.given_name,
                                        profile_picture: profile.picture,
                                        created_at: new Date().toISOString(),
                                    });
                            } else {
                                firebase
                                    .database()
                                    .ref('/users' + profile.sub)
                                    .update({
                                        last_logged_in: new Date().toISOString(),
                                    });
                            }

                        })
                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                    this.setState({ loading: false });
                }
            });
    }

    signIn = async () => {
        try {
            this.setState({ loadingGoogle: true });
            const result = await Google.logInAsync({
                // behavior: 'web',
                androidClientId: '622423906819-p7688d8es0sedepjrhc6jmsn0num2i84.apps.googleusercontent.com',
                clientId: '159038390060-3129473feovkmm6jlg5m6a522nv871h4.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });
            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                this.setState({ loadingGoogle: false });
                return { cancelled: true };
            }
        } catch (e) {
            this.setState({ loadingGoogle: false });
            return { error: true };
        }
    }

    render() {
        const { navigation } = this.props;
        const { loading, loadingGoogle } = this.state;

        return (
            <Block>
                <Block center bottom flex={0.4}>
                    <Text h1 center bold primary>
                        Be Lib.
                    </Text>
                    <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
                        Enjoy the experience.
          </Text>
                </Block>
                <Block center middle>
                    {this.renderIllustrations()}
                    {this.renderSteps()}
                </Block>
                <Block middle flex={0.6} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient onPress={this.signIn}>
                        {loadingGoogle ?
                            <ActivityIndicator size="small" color="white" /> :
                            <Text center semibold white>Se connecter avec Google</Text>
                        }
                    </Button>
                    <Button gradient onPress={() => navigation.navigate('Login')}>
                        {loading ?
                            <ActivityIndicator size="small" color="white" /> :
                            <Text center semibold white>Se connecter avec e-mail</Text>
                        }
                    </Button>
                    <Button color="gray" onPress={() => navigation.navigate('SignUp')}>
                            <Text center semibold white>Créer un compte</Text>
                    </Button>
                    <Button onPress={() => this.setState({ showTerms: true })}>
                        <Text center caption gray>Terms of service</Text>
                    </Button>
                </Block>
                {/* {this.renderTermsService()} */}
            </Block>
        );
    }
}

export const Welcome = WelcomeInternal;

const styles = StyleSheet.create({
    stepsContainer: {
        position: 'absolute',
        bottom: theme.sizes.base * 3,
        right: 0,
        left: 0,
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
    },
});
