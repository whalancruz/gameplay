import { StyleSheet, View, Image, Text, Platform } from "react-native";
import { theme } from "../styles/style";
import { ButtonPrimary } from "./buttonPrimary";
import { Feather, EvilIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { BorderlessButton, GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/auth";

type Props = {
    layoutBack?: boolean;
    showShared?: boolean;
    title?: string;
    dynamicShared?: () => void;
    dynamicMenu?: () => void;
};

export function Header({ layoutBack = false, showShared = false, title, dynamicShared, dynamicMenu }: Props) {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const { user } = useAuth();

    function handleBackPage() {
        navigation.goBack();
    };

    return (
        <View>

            {
                layoutBack && (
                    <LinearGradient style={styles.containerBack} colors={[theme.colors.secondary100, theme.colors.secondary40]}>
                        <View style={styles.containerBackSecondary}>

                            <View style={styles.iconLeft} >
                                <GestureHandlerRootView >
                                    <BorderlessButton onPress={handleBackPage}>
                                        <Feather
                                            name="arrow-left"
                                            size={24}
                                            color={theme.colors.heading}
                                        />
                                    </BorderlessButton>
                                </GestureHandlerRootView>
                            </View>

                            <Text style={styles.titleHeader}>{title}</Text>

                            {
                                showShared && (
                                    <View style={styles.iconRith}>
                                        <GestureHandlerRootView>
                                            <BorderlessButton onPress={dynamicShared}>
                                                <EvilIcons style={{ color: theme.colors.primary }} name="share-google" size={30} />
                                            </BorderlessButton>
                                        </GestureHandlerRootView>
                                    </View>
                                )
                            }


                        </View>
                    </LinearGradient>
                )
            }

            {
                !layoutBack && (
                    <View style={styles.container}>
                        <View style={styles.containerLeft}>
                            <Image style={styles.image} source={{ uri: user.avatarUrlImage }} />
                            <View style={styles.containerLeftImage}>
                                <Text style={styles.title}>Olá, <Text style={styles.bold}>{user.firstname}</Text></Text>
                                <Text style={styles.subtitle}>Hoje é dia de vitória</Text>
                            </View>
                        </View>

                        <ButtonPrimary onPress={dynamicMenu} icon={<Feather style={styles.icon} name="menu" size={20} />} />
                    </View>
                )
            }


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    containerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerLeftImage: {
        paddingHorizontal: 15
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8
    },
    title: {
        fontSize: 24,
        fontFamily: theme.fonts.title500,
        color: theme.colors.heading
    },
    subtitle: {
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight,
        fontSize: 13,
        marginTop: 5
    },
    bold: {
        fontWeight: "bold"
    },
    icon: {
        color: theme.colors.heading
    },
    containerBack: {
        height: Platform.OS === "ios" ? 90 : 100,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    containerBackSecondary: {
        flexDirection: "row",
        position: "relative",
        flex: 1,
        justifyContent: "center"
    },
    titleHeader: {
        fontSize: 20,
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700
    },
    iconLeft: {
        position: "absolute",
        left: 0
    },
    iconRith: {
        position: "absolute",
        right: 0
    }
});