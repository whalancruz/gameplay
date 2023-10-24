import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native"
import { theme } from "../styles/style";
import { MaterialIcons } from '@expo/vector-icons';
import { ListDivider } from "../components/listDivider";

type Props = {
    dynamicSelected: () => void;
}

export function Guilds({ dynamicSelected }: Props) {

    let listTeste = [
        {
            id: '1'
        },
        {
            id: '2'
        },
        {
            id: '3'
        }
    ]

    return (
        <View style={styles.container}>

            <FlatList
                keyExtractor={(item) => item.id}
                data={listTeste}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.paddingGuild}
                ItemSeparatorComponent={() => <ListDivider style={{ marginVertical: 10 }} />}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.7} onPress={dynamicSelected}>
                        <View style={styles.containerSelectServer}>

                            <View style={styles.containerSelectServerLeft}>
                                <LinearGradient style={styles.moldura} colors={[theme.colors.secondary50, theme.colors.secondary70]} >

                                </LinearGradient>
                            </View>

                            <View style={styles.containerSelectServerRigth}>
                                <View>
                                    <Text style={styles.title}>Lendários</Text>
                                    <Text style={styles.subtitle}>League of Legends</Text>
                                </View>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.heading} />
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    moldura: {
        width: 78,
        height: 78,
        padding: 2,
        borderRadius: 7
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
    containerSelectServerLeft: {

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