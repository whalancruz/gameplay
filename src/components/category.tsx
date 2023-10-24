import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, RectButton, RectButtonProps } from "react-native-gesture-handler";
import { theme } from "../styles/style";
import { SvgProps } from "react-native-svg";


type Props = RectButtonProps & {
    title: string;
    icon: React.FC<SvgProps>;
    hasCheckBox?: boolean;
    checked?: boolean;
}

export function Category({
    title,
    icon: Icon,
    checked = false,
    hasCheckBox = false,
    style,
    ...rest
}: Props) {
    return (
        <GestureHandlerRootView>
            <LinearGradient colors={[theme.colors.secondary50, theme.colors.secondary70]} style={[styles.containerButtonPrimary, style]} >
                <LinearGradient style={[styles.containerButton, { opacity: checked ? 1 : 0.5 }]} colors={[checked ? theme.colors.secondary85 : theme.colors.secondary50, theme.colors.secondary40]} >
                    <RectButton style={styles.container} {...rest}>
                        <Icon width={48} height={48} />
                        <Text style={styles.title}>{title}</Text>

                        {
                            hasCheckBox && (
                                <View style={checked ? styles.checked : styles.check}></View>
                            )
                        }

                    </RectButton>
                </LinearGradient>
            </LinearGradient>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 104,
        height: 110,
        alignItems: "center",
        justifyContent: "space-around"
    },
    containerButtonPrimary: {
        borderRadius: 7
    },
    containerButton: {
        margin: 2,
        borderRadius: 7
    },
    title: {
        fontSize: 15,
        fontFamily: theme.fonts.title500,
        color: theme.colors.heading
    },
    check: {
        position: "absolute",
        top: 3,
        right: 5,
        width: 13,
        height: 13,
        backgroundColor: theme.colors.secondary100,
        borderColor: theme.colors.secondary50,
        borderWidth: 2,
        borderRadius: 3
    },
    checked: {
        position: "absolute",
        top: 3,
        right: 5,
        width: 13,
        height: 13,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.secondary50,
        borderWidth: 2,
        borderRadius: 3
    }
});