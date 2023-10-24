import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { theme } from '../styles/style';
import { ReactNode } from 'react';

type Props =  {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
};

export function Background({ children, style }: Props) {
    return (
        <LinearGradient colors={[theme.colors.secondary80, theme.colors.secondary100]} style={[styles.container, style]} >
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});