import { StyleSheet, View, TextInputProps, TextInput, Text } from "react-native";
import { theme } from "../styles/style";

type Props = TextInputProps & {
    title: string;
    maxLength?: number;
};

export function TextArea({ title, maxLength = 100, style, ...res }: Props) {
    return (
        <View>
            <View style={styles.containerLabel}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>Max {maxLength} caracteres</Text>
            </View>
            <TextInput maxLength={maxLength} {...res} style={[styles.input, style]} />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        paddingVertical: 10
    },
    subTitle: {
        fontSize: 13,
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight
    },
    containerLabel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    input: {
        borderRadius: 7,
        backgroundColor: theme.colors.secondary40,
        minHeight: 95,
        borderWidth: 2,
        borderColor: theme.colors.secondary50,
        paddingHorizontal: 17,
        fontSize: 13,
        color: theme.colors.heading,
        paddingVertical: 15,
        textAlignVertical: 'top'
    }
});