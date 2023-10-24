


import { StyleSheet, View, Text } from "react-native";
import { theme } from "../styles/style";
import { LinearGradient } from "expo-linear-gradient";
import { ListHeader } from "./listHeader";
import { AntDesign } from '@expo/vector-icons';
import PlayerSvg from '../assets/player.svg';
import { GestureHandlerRootView, RectButton, RectButtonProps } from "react-native-gesture-handler";

type Props = RectButtonProps & {

}

export function Appointment({ ...rest }: Props) {
    return (
        <GestureHandlerRootView>
            <RectButton {...rest}>
                <View style={styles.container}>

                    <View>
                        <LinearGradient style={styles.moldura} colors={[theme.colors.secondary50, theme.colors.secondary70]} >

                        </LinearGradient>
                    </View>

                    <View style={styles.containerRigth}>
                        <ListHeader title="Lendários" subtitle="Ranqueada" />
                        <Text style={styles.title}>League of Legends</Text>
                        <View style={styles.containerInfo}>
                            <View style={styles.containerDateInfo}>
                                <AntDesign name="calendar" size={15} color={theme.colors.primary} />
                                <Text style={styles.titleInfo}>
                                    Sex 18/06 às 21:00h
                                </Text>
                            </View>
                            <View style={styles.containerOnPeoples}>
                                <PlayerSvg fill={theme.colors.primary} />
                                <Text style={styles.numberOnlys}>3</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </RectButton>
        </GestureHandlerRootView>
    );
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
        fontSize: 13,
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight,
        marginVertical: 7
    },
    containerInfo: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    containerDateInfo: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerOnPeoples: {
        flexDirection: "row",
        alignItems: "center"
    },
    numberOnlys: {
        fontSize: 13,
        marginLeft: 7,
        color: theme.colors.heading
    },
    titleInfo: {
        fontFamily: theme.fonts.text500,
        color: theme.colors.heading,
        fontSize: 13,
        justifyContent: "center",
        marginLeft: 5
    },
    titleInfoIcon: {
        marginRight: 30
    }
});