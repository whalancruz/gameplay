import { Image, StyleSheet, View, Text } from "react-native";
import { Background } from "../components/background";
import { ButtonDiscord } from "../components/buttonDiscord";
import { theme } from "../styles/style";
import { enviroment } from "../environments/environments";
import { useEffect } from "react";
import { api } from "../services/api.services";
import { useAuth } from "../hooks/auth";
import { IUser } from "../interfaces/user.interfaces";
import { useAuthRequest } from "expo-auth-session";
import { StorageKeys } from "../enums/storage";
import { requestAuthToken } from "../services/discord.services";

import Storage from "../utils/storage";
import Illustration from "../assets/illustration.png";

import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export function Signin() {
    const { CLIENT_ID, RESPONSE_TYPE, SCOPE, REDIRECT_URI, CDN_URI } = enviroment;
    const { setUser } = useAuth();

    const discovery = {
        authorizationEndpoint: `${SCOPE}/oauth2/authorize`
    };

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: CLIENT_ID,
            redirectUri: REDIRECT_URI,
            responseType: "code",
            scopes: RESPONSE_TYPE
        },
        discovery
    );

    useEffect(() => {
        async function requestUsers() {
            if (response?.type === 'success') {
                const { code } = response.params;
                await getAuthToken(code);
            };
        };
        requestUsers();
    }, [response]);


    async function handleSignIn() {
        try {
            await promptAsync();
        } catch (error) { }
    };

    async function getAuthToken(code: string) {
        let acces_token = await requestAuthToken(code, (request?.codeVerifier ?? ""));
        if (acces_token) requestUser(acces_token)
    };

    async function requestUser(access_token: string) {
        api.defaults.headers.common.Authorization = `Bearer ${access_token}`;

        await api.get("/users/@me").then(async response => {
            let usuario = response.data as IUser;

            if (usuario) {
                
                usuario.firstname = usuario.global_name.split(' ')[0];
                usuario.avatarUrlImage = `${CDN_URI}/avatars/${usuario.id}/${usuario.avatar}.png`;
                usuario.token = access_token;

                await Storage.set(StorageKeys.gameplay_user, JSON.stringify(usuario));

                setUser(usuario);
            };

        });
    };

    return (
        <Background>
            <View style={styles.container}>

                <Image resizeMode="stretch" source={Illustration} />

                <View>

                    <Text style={styles.title}>
                        Conecte-se {'\n'}
                        e organize suas {'\n'}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {'\n'}
                        favoritos com seus amigos
                    </Text>

                    <ButtonDiscord onPress={handleSignIn} title="Entrar com Discord" />

                </View>

            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    title: {
        fontSize: 40,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        textAlign: "center",
        lineHeight: 42
    },
    subtitle: {
        fontSize: 15,
        fontFamily: theme.fonts.text400,
        color: theme.colors.heading,
        textAlign: "center",
        lineHeight: 27,
        marginVertical: 20
    }
});