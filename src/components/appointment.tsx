


import { StyleSheet, View, Text, Image } from "react-native";
import { theme } from "../styles/style";
import { LinearGradient } from "expo-linear-gradient";
import { ListHeader } from "./listHeader";
import { AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView, RectButton, RectButtonProps } from "react-native-gesture-handler";
import { IAppointment } from "../interfaces/appointment.interfaces";
import { format, parseISO } from 'date-fns';
import { ptBR } from "date-fns/locale";

import PlayerSvg from '../assets/player.svg';

type Props = RectButtonProps & {
    data: IAppointment;
};

export function Appointment({ data, ...rest }: Props) {

    function handleFormatDate(date: Date): string {
        const dataFormatada = format(parseISO(date.toString()), "E dd/MM 'às' HH:mm", { locale: ptBR });
        return String(dataFormatada);
    };

    return (
        <GestureHandlerRootView>
            <RectButton {...rest}>
                <View style={styles.container}>

                    <LinearGradient style={styles.moldura} colors={[theme.colors.secondary50, theme.colors.secondary70]} >
                        <Image style={styles.imageGuild} source={{ uri: data.guild.iconUrl }} />
                    </LinearGradient>

                    <View style={styles.containerRigth}>
                        <ListHeader title={data.guild.name} subtitle={data.category.title} />
                        <Text style={styles.title}>{data.guild.owner ? 'Administrador' : 'Convidado'}</Text>
                        <View style={styles.containerInfo}>
                            <View style={styles.containerDateInfo}>
                                <AntDesign name="calendar" size={15} color={theme.colors.primary} />
                                <Text style={styles.titleInfo}>
                                    {handleFormatDate(data.date)}
                                </Text>
                            </View>
                            <View style={styles.containerOnPeoples}>
                                <PlayerSvg fill={theme.colors.primary} />
                                <Text style={styles.numberOnlys}>{data.membersOnly}</Text>
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
        width: 80,
        height: 80,
        padding: 2,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
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
    },
    imageGuild: {
        width: 75,
        height: 75,
        borderRadius: 7
    }
});