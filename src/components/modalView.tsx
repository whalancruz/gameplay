import { ReactNode } from "react";
import { StyleSheet, Modal, ModalProps, View } from "react-native";
import { Background } from "./background";
import { theme } from "../styles/style";

type Props = ModalProps & {
    children: ReactNode;
};

export function ModalView({ children, ...rest }: Props) {
    return (
        <Modal
            transparent
            animationType="slide"
            statusBarTranslucent
            {...rest}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Background style={styles.background}>
                        <View style={styles.containerContent}>
                            <View style={styles.bar} />
                            {children}
                        </View>
                    </Background>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: theme.colors.overlay
    },
    container: {
        flex: 1,
        marginTop: 100
    },
    containerContent: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20
    },
    bar: {
        height: 2,
        width: 39,
        marginVertical: 20,
        backgroundColor: theme.colors.secondary30,
        borderRadius: 7
    },
    background: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
});