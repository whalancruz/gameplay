import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import { Header } from "../components/header";

import imageBanner from "../assets/banner.png";
import { theme } from "../styles/style";
import { ListHeader } from "../components/listHeader";
import { Members } from "../components/members";
import { ListDivider } from "../components/listDivider";
import { Background } from "../components/background";
import { ButtonDiscord } from "../components/buttonDiscord";

export function AppointmentDetails() {

    let listTeste = [
        {
            id: '1'
        },
        {
            id: '2'
        },
        {
            id: '3'
        },
        {
            id: '4'
        }
    ]

    return (
        <Background>
            <View style={styles.container}>
                <Header layoutBack={true} showShared={true} title="Lendários" />

                <View style={styles.containerHeader}>
                    <Image style={styles.imageBanner} source={imageBanner} />

                    <View style={styles.containerHeaderInfo}>
                        <Text style={styles.titleInfo}>
                            League of Legends
                        </Text>
                        <Text style={styles.subTitleInfo}>
                            É hoje que vamos chegar ao challenger sem {'\n'}
                            perder uma partida da md10
                        </Text>
                    </View>

                </View>

                <View style={styles.containerMembers}>
                    <ListHeader style={styles.listHeader} title="Jogadores" subtitle="Total 3" />

                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={listTeste}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider style={{ marginVertical: 10 }} />}
                        renderItem={({ item }) => (
                            <Members />
                        )}
                    />

                    <ButtonDiscord style={{ marginVertical: 25 }} title="Entrar no servidor do Discord" />

                </View>

            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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