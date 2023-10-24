import { Image, StyleSheet, View, Text } from "react-native";
import { Background } from "../components/background";
import { ButtonDiscord } from "../components/buttonDiscord";
import { theme } from "../styles/style";
import Illustration from "../assets/illustration.png";
import { enviroment } from "../environments/environments";
import { useEffect } from "react";
import { CodeChallengeMethod, makeRedirectUri, useAuthRequest, useAutoDiscovery } from "expo-auth-session";

import * as WebBrowser from 'expo-web-browser';
import { api } from "../services/api";
import * as Crypto from 'expo-crypto';


WebBrowser.maybeCompleteAuthSession();

export function Signin() {
    const { CLIENT_ID, RESPONSE_TYPE, SCOPE } = enviroment;

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const discovery = {
        authorizationEndpoint: `${SCOPE}/oauth2/authorize`
    };

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: CLIENT_ID,
            redirectUri: "exp://192.168.0.70:8081",
            scopes: RESPONSE_TYPE,
            responseType: "code",
            codeChallenge: "b4b888fe3a4ea30e8eefc94f7f9c54dbf2e365cdd1d68b036ea1b374730063f4",
            codeChallengeMethod: CodeChallengeMethod.S256
        },
        discovery
    );

    useEffect(() => {

        async function requestUsers() {
            if (response?.type === 'success') {
                const { code } = response.params;

                const params = new URLSearchParams();

                params.append('code', code);
                params.append('client_id', '1165845009334018170');
                params.append('client_secret', 'kvvZRnYQePxq7qx7Wx32e7egeKz80dZV');
                params.append('grant_type', 'authorization_code');
                params.append('redirect_uri', 'exp://192.168.0.70:8081');
                params.append('scope', 'identify');
                params.append('code_verifier', "ks02i3jdikdo2k0dkfodf3m39rjfjsdk0wk349rj3jrhf");

                console.log("response", response)

                // api.defaults.headers.common["Content-Type"] = `application/x-www-form-urlencoded`;
                // await api.post(`https://discord.com/api/oauth2/token`, params);
            };
        };

        requestUsers();
    }, [response]);


    function generateCodeVerifier(): string {
        const codeVerifier = Crypto.getRandomBytes(32);
        return String(codeVerifier);
    };

    async function generateCodeChallenge(codeVerifier: string): Promise<string> {

        const digest = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            codeVerifier
        );

        return digest;
    };

    async function handleSignIn() {
        try {
            await promptAsync();
        } catch (error) { }
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