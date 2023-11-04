import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Header } from "../components/header";
import { theme } from "../styles/style";
import { CategorySelect } from "../components/categorySelect";
import { useState } from "react";
import { ICategoriesProps } from "../utils/categories";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";
import { DatePicker } from "../components/datePicker";
import { TextArea } from "../components/textArea";
import { ButtonPrimary } from "../components/buttonPrimary";
import { ModalView } from "../components/modalView";
import { Guilds } from "./guilds";
import { IGuild } from "../interfaces/guilds.interfaces";
import { IAppointment } from "../interfaces/appointment.interfaces";
import { StorageKeys } from "../enums/storage";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { v4 as uuidv4 } from 'uuid';
import Storage from "../utils/storage";

export function AppointmentCreate() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const [category, setCategory] = useState<ICategoriesProps>();
    const [guildSelect, setGuildSelect] = useState<IGuild>();
    const [description, setDescription] = useState<string>();
    const [dateSelect, setDateSelect] = useState<Date>(new Date());
    const [visibleModalGuilds, setVisibleModalGuilds] = useState<boolean>(false);

    function handleCategorySelect(category: ICategoriesProps) {
        setCategory(category);
    };

    function handleGuildInicialize() {
        setVisibleModalGuilds(true);
    };

    function handleGuildSelected(guild: IGuild) {
        setGuildSelect(guild);
        setVisibleModalGuilds(false);
    };

    function handleDateSelected(date: Date) {

        let newDate = dateSelect;

        // Mantém a hora e os minutos da nova data, mas altera o dia, mês e ano
        newDate.setUTCFullYear(date.getUTCFullYear());
        newDate.setUTCMonth(date.getUTCMonth());
        newDate.setUTCDate(date.getUTCDate());

        setDateSelect(newDate);
    };

    function handleHoursSelected(date: Date) {

        const hora = date.getUTCHours(); // Obtém a hora em UTC
        const minutos = date.getUTCMinutes(); // Obtém os minutos em UTC

        let newDate = dateSelect;

        newDate.setUTCHours(hora);
        newDate.setUTCMinutes(minutos);

        setDateSelect(newDate);
    };

    async function handleCreateAppointment() {
        let appointmentStorage = await Storage.get(StorageKeys.gameplay_appointment) as IAppointment[] || [];

        if (!description) return;

        appointmentStorage.push({
            category: category ?? {} as ICategoriesProps,
            guild: guildSelect ?? {} as IGuild,
            date: dateSelect,
            description: description ?? "",
            id: uuidv4()
        })

        await Storage.set(StorageKeys.gameplay_appointment, JSON.stringify(appointmentStorage));

        navigation.navigate("Home");
    };

    return (
        <View style={styles.containerDefault}>

            <Header layoutBack={true} title="Agendar partida" />

            <KeyboardAwareScrollView style={styles.container}>

                <ScrollView contentContainerStyle={{}}>

                    <View style={styles.container}>

                        <View style={styles.containerCategories}>

                            <Text style={styles.titleCategories}>Categoria</Text>

                            <CategorySelect categorySelect={category} dynamicPress={handleCategorySelect} hasCheckBox={true} />

                            <GestureHandlerRootView>
                                <RectButton style={styles.containerSelectServerReact} onPress={handleGuildInicialize}>
                                    <View style={styles.containerSelectServer}>

                                        <LinearGradient style={styles.moldura} colors={[theme.colors.secondary50, theme.colors.secondary70]} >
                                            {
                                                (guildSelect) && (
                                                    <Image resizeMode="cover" style={styles.imageGuild} source={{ uri: guildSelect.iconUrl }} />
                                                )
                                            }
                                        </LinearGradient>

                                        <View style={styles.containerSelectServerRigth}>
                                            <Text style={styles.titleServidor}>{(guildSelect) ? guildSelect.name : "Selecione um servidor"}</Text>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.heading} />
                                        </View>

                                    </View>
                                </RectButton>
                            </GestureHandlerRootView>

                            <View style={styles.containerForm}>

                                <View style={{ flex: 0.5, marginRight: 15 }}>
                                    <DatePicker mode="date" changeElement={handleDateSelected} title="Data" />
                                </View>

                                <View style={{ flex: 0.5 }}>
                                    <DatePicker mode="time" changeElement={handleHoursSelected} title="Horário" />
                                </View>

                            </View>

                            <View style={styles.containerFormDescription}>
                                <TextArea onChangeText={setDescription} multiline
                                    numberOfLines={5}
                                    autoCorrect={false}
                                    maxLength={100}
                                    title="Descrição" />
                            </View>

                            <ButtonPrimary onPress={handleCreateAppointment} style={styles.buttonConfirm} title="Agendar" />
                        </View>


                    </View>

                    <ModalView active={visibleModalGuilds} setModalVisible={setVisibleModalGuilds}>
                        <Guilds dynamicSelected={handleGuildSelected} />
                    </ModalView>

                </ScrollView>

            </KeyboardAwareScrollView >
        </View>
    );
};

const styles = StyleSheet.create({
    containerDefault: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary100,
        paddingBottom: 50
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
    },
    imageGuild: {
        width: 75,
        height: 75,
        borderRadius: 7
    }
});