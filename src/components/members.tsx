import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, Image } from "react-native";
import { theme } from "../styles/style";
import { IMembers } from "../interfaces/members.interfaces";

type Props = {
    data: IMembers;
};

export function Members({ data }: Props) {
    let isOnline = (data.status === "online");

    return (
        <View style={styles.container}>

            <LinearGradient style={styles.moldura} colors={[theme.colors.secondary50, theme.colors.secondary70]} >
                <Image style={styles.imageMember} source={{ uri: data.avatar_url }} />
            </LinearGradient>

            <View style={styles.containerRigth}>
                <Text style={styles.title}>{data.username}</Text>

                <View style={styles.containerStatus}>
                    <View style={[styles.dotStatus, { backgroundColor: (isOnline) ? theme.colors.on : theme.colors.primary }]} />
                    <Text style={styles.titleStatus}>{isOnline ? "Disponivel" : "Ocupado"}</Text>
                </View>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerRigth: {
        flex: 1,
        paddingLeft: 20
    },
    moldura: {
        width: 80,
        height: 80,
        padding: 2,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    },
    imageMember: {
        width: 75,
        height: 75,
        borderRadius: 7
    },
    title: {
        fontSize: 18,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        marginVertical: 5
    },
    containerStatus: {
        flexDirection: "row",
        alignItems: "center"
    },
    dotStatus: {
        width: 10,
        height: 10,
        borderRadius: 10
    },
    titleStatus: {
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight,
        fontSize: 13,
        marginLeft: 7
    }
});