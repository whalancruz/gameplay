


import { StyleSheet, View, Text, ViewProps } from "react-native";
import { theme } from "../styles/style";

export interface IListHeader extends ViewProps {
    title: string;
    subtitle: string;
};

export function ListHeader({ title, subtitle, style }: IListHeader) {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 18,
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700
    },
    subtitle: {
        fontSize: 13,
        color: theme.colors.highlight,
        fontFamily: theme.fonts.text400
    }
});