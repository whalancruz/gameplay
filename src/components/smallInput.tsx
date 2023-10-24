import { StyleSheet, View, Text, TextInputProps } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { theme } from "../styles/style";

type Props = TextInputProps & {
    title: string;
    mask: string;
};

export function SmallInput({ title, mask, style }: Props) {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <MaskedTextInput style={[styles.input, style]}
                mask={mask}
                onChangeText={() => { }}
            />
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
    input: {
        borderRadius: 7,
        backgroundColor: theme.colors.secondary40,
        height: 55,
        borderWidth: 2,
        borderColor: theme.colors.secondary50,
        paddingHorizontal: 17,
        fontSize: 13,
        color: theme.colors.heading
    }
});