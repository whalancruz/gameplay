


import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { StyleSheet, View, Text, Image } from "react-native";
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";
import { theme } from "../styles/style";
import { Feather } from '@expo/vector-icons';
import { useAuth } from "../hooks/auth";
import { LinearGradient } from "expo-linear-gradient";
import { ListDivider } from "./listDivider";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { ModalView } from "./modalView";
import { ButtonPrimary } from "./buttonPrimary";
import { useState } from "react";
import { IUser } from "../interfaces/user.interfaces";
import { StorageKeys } from "../enums/storage";

import Storage from "../utils/storage";

export function DrawerCustom({ ...rest }: DrawerContentComponentProps) {
    const { user, setUser } = useAuth();
    const [modalView, setModalView] = useState<boolean>(false);

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleAppointmentCreate() {
        navigation.navigate("AppointmentCreate");
    };

    function handleModal(open: boolean) {
        setModalView(open);
    };

    function handleCloseApp() {
        Storage.set(StorageKeys.gameplay_appointment, JSON.stringify(null));
        setUser({} as IUser);
    };

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container} {...rest} >

            <View style={styles.containerSecondary}>
                <View style={styles.content}>

                    <View style={styles.containerProfile}>
                        <LinearGradient style={styles.moldura} colors={[theme.colors.secondary40, theme.colors.secondary40]}>
                            <Image style={styles.imageProfile} source={{ uri: user.avatarUrlImage }} />
                        </LinearGradient>
                        <Text style={styles.titleUser}>{user.global_name}</Text>
                    </View>

                    <ListDivider style={{ alignSelf: "center" }} />

                    <View style={{ marginTop: 10 }}>
                        <GestureHandlerRootView>
                            <RectButton style={styles.button} onPress={handleAppointmentCreate}>
                                <Feather name="calendar" size={20} color={theme.colors.heading} />
                                <Text style={styles.titleFooter}>Novo Agendamento</Text>
                            </RectButton>
                        </GestureHandlerRootView>
                    </View>

                </View>
                <GestureHandlerRootView>
                    <RectButton onPress={() => handleModal(true)} style={styles.footer}>
                        <Feather name="log-out" size={20} color={theme.colors.heading} />
                        <Text style={styles.titleFooter}>Sair</Text>
                    </RectButton>
                </GestureHandlerRootView>
            </View>

            <ModalView active={modalView} disabledGesture={true} endPosition={true} setModalVisible={setModalView} style={styles.containerModal}>
                <View style={styles.containerCloseApp}>

                    <Text style={styles.titleCloseApp}>
                        Deseja sair do <Text style={styles.titleCloseAppBold}>Game<Text style={{ color: theme.colors.primary }}>Play</Text>?</Text>
                    </Text>

                    <View style={styles.containerQuestionCloseApp}>
                        <ButtonPrimary onPress={() => handleModal(false)} style={styles.buttonCloseAppLeft} title="Não" />
                        <ButtonPrimary onPress={handleCloseApp} style={styles.buttonCloseAppRigh} title="Sim" />
                    </View>

                </View>
            </ModalView>
        </DrawerContentScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary90
    },
    containerSecondary: {
        flex: 1,
        justifyContent: "center"
    },
    content: {
        flex: 1,
        paddingHorizontal: 12
    },
    footer: {
        display: "flex",
        height: 50,
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16
    },
    button: {
        display: "flex",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16
    },
    titleFooter: {
        color: theme.colors.heading,
        fontFamily: theme.fonts.title500,
        fontSize: 17,
        marginLeft: 10
    },
    titleUser: {
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700,
        fontSize: 17,
        marginTop: 15
    },
    containerProfile: {
        alignItems: "center",
        paddingVertical: 20
    },
    moldura: {
        width: 95,
        height: 95,
        padding: 2,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    imageProfile: {
        width: 90,
        height: 90,
        borderRadius: 100
    },
    containerCloseApp: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    titleCloseApp: {
        color: theme.colors.heading,
        fontFamily: theme.fonts.title500,
        fontSize: 23
    },
    titleCloseAppBold: {
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700,
        fontSize: 23
    },
    buttonCloseAppLeft: {
        height: 70,
        width: 170,
        marginRight: 10,
        backgroundColor: theme.colors.secondary85
    },
    buttonCloseAppRigh: {
        height: 70,
        width: 170
    },
    containerModal: {
        flex: 0.3
    },
    containerQuestionCloseApp: {
        flexDirection: "row",
        marginTop: 15
    }
});