import { TouchableOpacity, Text, View, Image, StyleSheet, TouchableOpacityProps } from "react-native";

import { theme } from "../styles/style";
import ImageDiscord from "../assets/discord.png";

export interface IButtonDiscordProps extends TouchableOpacityProps {
    title: string
};

export function ButtonDiscord({ title, style, ...res }: IButtonDiscordProps) {
    return (
        <TouchableOpacity style={[styles.container, style]} {...res} activeOpacity={0.6}>
            <Image style={styles.image} source={ImageDiscord} />
            <View style={styles.containerTitle}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        width: "100%",
        borderRadius: 6,
        alignItems: "center"
    },
    image: {
        marginHorizontal: 20
    },
    containerTitle: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: 60,
        borderRadius: 6,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 2,
        borderLeftColor: theme.colors.secondary90,
        textAlign: "center"
    },
    title: {
        fontSize: 18,
        color: theme.colors.heading,
        fontFamily: theme.fonts.title500
    }
})