import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text } from "react-native";
import { theme } from "../styles/style";

export function Members() {
    return (
        <View style={styles.container}>

            <View>
                <LinearGradient style={styles.moldura} colors={[theme.colors.secondary50, theme.colors.secondary70]} >

                </LinearGradient>
            </View>

            <View style={styles.containerRigth}>
                <Text style={styles.title}>Whalan Cruz</Text>

                <View style={styles.containerStatus}>
                    <Text style={[styles.dotStatus, { backgroundColor: theme.colors.on }]} />
                    <Text style={styles.titleStatus}>Disponivel</Text>
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
        width: 64,
        height: 68,
        padding: 2,
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
        borderRadius: 100
    },
    titleStatus: {
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight,
        fontSize: 13,
        marginLeft: 7
    }
});