import { StyleSheet, View, Text } from "react-native";
import { Background } from "../components/background";
import { Header } from "../components/header";
import { theme } from "../styles/style";
import { CategorySelect } from "../components/categorySelect";
import { useState } from "react";
import { ICategoriesProps } from "../utils/categories";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";
import { SmallInput } from "../components/smallInput";
import { TextArea } from "../components/textArea";
import { ButtonPrimary } from "../components/buttonPrimary";
import { ModalView } from "../components/modalView";
import { Guilds } from "./guilds";

export function AppointmentCreate() {
    const [category, setCategory] = useState<ICategoriesProps>();
    const [visibleModalGuilds, setVisibleModalGuilds] = useState<boolean>(false);

    function handleCategorySelect(category: ICategoriesProps) {
        setCategory(category);
    };

    function handleGuildInicialize() {
        setVisibleModalGuilds(true);
    };

    function handleGuildSelected() {
        setVisibleModalGuilds(false);
    };

    return (
        <Background>
            <View style={styles.container}>

                <Header layoutBack={true} title="Agendar partida" />

                <View style={styles.containerCategories}>

                    <Text style={styles.titleCategories}>Categoria</Text>

                    <CategorySelect categorySelect={category} dynamicPress={handleCategorySelect} hasCheckBox={true} />

                    <GestureHandlerRootView>
                        <RectButton style={styles.containerSelectServerReact} onPress={handleGuildInicialize}>
                            <View style={styles.containerSelectServer}>

                                <View style={styles.containerSelectServerLeft}>
                                    <LinearGradient style={styles.moldura} colors={[theme.colors.secondary50, theme.colors.secondary70]} >

                                    </LinearGradient>
                                </View>

                                <View style={styles.containerSelectServerRigth}>
                                    <Text style={styles.titleServidor}>Selecione um servidor</Text>
                                    <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.heading} />
                                </View>

                            </View>
                        </RectButton>
                    </GestureHandlerRootView>

                    <View style={styles.containerForm}>

                        <View style={{ flex: 0.5 }}>
                            <SmallInput mask="99/99" title="Dia e mês" style={{ marginRight: 20 }} />
                        </View>

                        <View style={{ flex: 0.5 }}>
                            <SmallInput mask="99:99" title="Horário" />
                        </View>

                    </View>

                    <View style={styles.containerFormDescription}>
                        <TextArea multiline
                            numberOfLines={5}
                            autoCorrect={false}
                            maxLength={100}
                            title="Descrição" />
                    </View>

                    <ButtonPrimary style={styles.buttonConfirm} title="Agendar" />

                </View>
            </View>

            <ModalView visible={visibleModalGuilds}>
                <Guilds dynamicSelected={handleGuildSelected}/>
            </ModalView>

        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerCategories: {
        paddingHorizontal: 20,
        marginTop: 25
    },
    titleCategories: {
        fontSize: 18,
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700,
        marginBottom: 10
    },
    moldura: {
        width: 78,
        height: 78,
        padding: 2,
        borderRadius: 7
    },
    containerSelectServerReact: {
        marginVertical: 25
    },
    containerSelectServer: {
        borderColor: theme.colors.secondary50,
        borderWidth: 2,
        height: 100,
        borderRadius: 7,
        paddingHorizontal: 7,
        flexDirection: "row",
        alignItems: "center"
    },
    containerSelectServerLeft: {

    },
    containerSelectServerRigth: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        paddingHorizontal: 20
    },
    titleServidor: {
        fontSize: 18,
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700
    },
    containerForm: {
        flexDirection: "row"
    },
    containerFormDescription: {
        paddingVertical: 20
    },
    buttonConfirm: {
        width: "100%",
        marginTop: 5
    }
});