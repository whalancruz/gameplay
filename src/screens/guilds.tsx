import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { theme } from "../styles/style";
import { MaterialIcons } from '@expo/vector-icons';
import { ListDivider } from "../components/listDivider";
import { useEffect, useState } from "react";
import { api } from "../services/api.services";
import { IGuild } from "../interfaces/guilds.interfaces";
import { Loader } from "../components/loader";
import { enviroment } from "../environments/environments";

type Props = {
    dynamicSelected: (guild: IGuild) => void;
};

export function Guilds({ dynamicSelected }: Props) {
    const [guilds, setGuilds] = useState<IGuild[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { CDN_URI } = enviroment;

    useEffect(() => {

        async function fetchGuilds() {
            setLoading(true);
            await api.get("/users/@me/guilds").then(response => {
                let guilds = response.data as IGuild[];

                guilds = guilds.map(guild => ({
                    ...guild,
                    iconUrl: `${CDN_URI}/icons/${guild.id}/${guild.icon}.png`
                }));

                setGuilds(guilds);
                setLoading(false);
            });
        };

        fetchGuilds();
    }, []);


    return (
        <View style={styles.container}>
            {

                loading ?
                    <Loader />
                    :
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={guilds}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.paddingGuild}
                        ItemSeparatorComponent={() => <ListDivider style={{ marginVertical: 10 }} />}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => dynamicSelected(item)}>
                                <View style={styles.containerSelectServer}>

                                    <LinearGradient style={styles.moldura} colors={[theme.colors.secondary50, theme.colors.secondary70]} >
                                        <Image resizeMode="cover" style={styles.imageGuild} source={{ uri: item.iconUrl }} />
                                    </LinearGradient>

                                    <View style={styles.containerSelectServerRigth}>
                                        <View>
                                            <Text style={styles.title}>{item.name}</Text>
                                            <Text style={styles.subtitle}>{item.owner ? 'Administrador' : 'Convidado'}</Text>
                                        </View>
                                        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.heading} />
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )}
                    />

            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        // backgroundColor: theme.colors.secondary100
    },
    moldura: {
        width: 80,
        height: 80,
        padding: 2,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    },
    containerSelectServerReact: {
        marginVertical: 25
    },
    containerSelectServer: {
        height: 100,
        borderRadius: 7,
        flexDirection: "row",
        alignItems: "center"
    },
    imageGuild: {
        width: 75,
        height: 75,
        borderRadius: 7
    },
    containerSelectServerRigth: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        paddingLeft: 20
    },
    title: {
        fontSize: 18,
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700
    },
    subtitle: {
        fontSize: 13,
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight,
        marginVertical: 5
    },
    paddingGuild: {
        paddingBottom: 20
    }
});