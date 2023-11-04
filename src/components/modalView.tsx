import { ReactNode } from "react";
import { StyleSheet, Modal, ModalProps, View, Dimensions, TouchableWithoutFeedback, ScrollView, Platform } from "react-native";
import { Background } from "./background";
import { theme } from "../styles/style";
import { Gesture, GestureDetector, GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

type Props = ModalProps & {
    children: ReactNode;
    active: boolean;
    disabledGesture?: boolean;
    endPosition?: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ModalView({ children, active, disabledGesture, endPosition, setModalVisible, style }: Props) {
    const screenHeight = Dimensions.get('window').height;
    const height = (disabledGesture) ? 0 : (Platform.OS === "ios") ? 150 : 100;
    const offset = useSharedValue(height);

    const pan = Gesture.Pan().onChange((event) => {
        if (disabledGesture) return;

        offset.value += event.changeY;

        if (offset.value < 0) {
            offset.value = 0;
        } else if (offset.value > screenHeight) offset.value = screenHeight;

    }).onFinalize(() => {
        if (disabledGesture) return;

        if (offset.value >= (screenHeight - 70)) {
            runOnJS(handleCloseModal)();
        };
    });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }]
    }));

    function handleShow() {
        offset.value = height;
    };

    function handleCloseModal() {
        setModalVisible(false);
    };

    return (
        <Modal
            transparent
            statusBarTranslucent
            onShow={handleShow}
            visible={active} >
            <View style={styles.overlay}>
                <GestureHandlerRootView style={[styles.containerFlex]}>

                    <RectButton style={[styles.containerFlex]} onPress={handleCloseModal}>
                        <GestureHandlerRootView style={[styles.containerFlex]}>

                            <View style={[styles.container]}>
                                <GestureDetector gesture={pan}>

                                    <Animated.View style={[styles.containerFlex, animatedStyles, { justifyContent: (endPosition) ? "flex-end" : "center" }]} >
                                        <Background style={[styles.background, style]}>
                                            {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}

                                            <View style={styles.containerContent}>
                                                <View style={styles.bar} />
                                                {children}
                                            </View>

                                            {/* </ScrollView> */}
                                        </Background>
                                    </Animated.View>

                                </GestureDetector>
                            </View>

                        </GestureHandlerRootView>
                    </RectButton >

                </GestureHandlerRootView>
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
        flex: 1
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
    },
    containerFlex: {
        flex: 1
    },
    scrollContent: {
        flexGrow: 1,
    }
});