import { StyleSheet, View, Image, Text, FlatList, Share, Platform } from "react-native";
import { Header } from "../components/header";
import { theme } from "../styles/style";
import { ListHeader } from "../components/listHeader";
import { Members } from "../components/members";
import { ListDivider } from "../components/listDivider";
import { Background } from "../components/background";
import { ButtonDiscord } from "../components/buttonDiscord";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { IAppointment } from "../interfaces/appointment.interfaces";
import { useCallback, useState } from "react";
import { api } from "../services/api.services";
import { IGuildWidget } from "../interfaces/guilds.interfaces";

import imageBanner from "../assets/banner.png";

import * as Linking from 'expo-linking';

type Params = {
    appointment: IAppointment;
};

export function AppointmentDetails() {
    const [guildWidget, setGuildWidget] = useState<IGuildWidget>({} as IGuildWidget);

    const route = useRoute();
    const { appointment } = route.params as Params;

    useFocusEffect(useCallback(() => {
        fetchGuildInfo();
    }, []));

    async function fetchGuildInfo() {
        await api.get(`/guilds/${appointment.guild.id}/widget.json`).then(response => {
            let guildsWidget = response.data as IGuildWidget;
            setGuildWidget(guildsWidget);
        });
    };

    function handleShared() {
        let message = Platform.OS === "ios" ? `Junte-se á ${appointment.guild.name}` : guildWidget.instant_invite;

        Share.share({
            message,
            url: guildWidget.instant_invite
        });
    };

    function handleOpen() {
        Linking.openURL(guildWidget.instant_invite);
    };

    return (
        <Background>
            <View style={styles.container}>
                <Header dynamicShared={handleShared} layoutBack={true} showShared={appointment.guild.owner} title={appointment.guild.name} />

                <View style={styles.containerHeader}>
                    <Image style={styles.imageBanner} source={imageBanner} />

                    <View style={styles.containerHeaderInfo}>
                        <Text style={styles.titleInfo}>
                            {appointment.guild.name}
                        </Text>
                        <Text style={styles.subTitleInfo}>
                            {appointment.description}
                        </Text>
                    </View>

                </View>

                <View style={styles.containerMembers}>
                    <ListHeader style={styles.listHeader} title="Jogadores" subtitle={`Total ${guildWidget.presence_count}`} />

                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={guildWidget.members}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 20}}
                        ItemSeparatorComponent={() => <ListDivider style={{ marginVertical: 10 }} />}
                        renderItem={({ item }) => (
                            <Members data={item} />
                        )}
                    />

                    {
                        appointment.guild.owner && (
                            <ButtonDiscord onPress={handleOpen} style={{ marginVertical: 25 }} title="Entrar no servidor do Discord" />
                        )
                    }

                </View>

            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary100
    },
    containerHeader: {
        width: "100%"
    },
    containerHeaderInfo: {
        position: "absolute",
        bottom: 20,
        left: 25
    },
    containerMembers: {
        paddingHorizontal: 20,
        marginTop: 25,
        justifyContent: "flex-end",
        flex: 1
    },
    imageBanner: {
        width: "100%"
    },
    titleInfo: {
        fontSize: 28,
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700,
        marginBottom: 10
    },
    subTitleInfo: {
        fontSize: 13,
        color: theme.colors.highlight,
        fontFamily: theme.fonts.text400,
        lineHeight: 22
    },
    listHeader: {
        marginBottom: 25
    }
});