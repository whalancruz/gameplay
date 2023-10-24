import { StyleSheet, Text, View } from "react-native";
import { RectButton, GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";

import { theme } from "../styles/style";
import { ReactNode } from "react";

export interface IButtonPrimaryProps extends RectButtonProps {
    title?: string;
    icon?: ReactNode;
}

export function ButtonPrimary({ title, icon, style }: IButtonPrimaryProps) {
    return (
        <GestureHandlerRootView>
            <RectButton style={[styles.container, style]}>
                {
                    icon && <View>{icon}</View>
                }
                {
                    title && <Text style={styles.title}>{title}</Text>
                }
            </RectButton>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 7,
        width: 50,
        height: 50
    },
    title: {
        color: theme.colors.heading,
        fontSize: 15
    }
})