
import { View, StyleSheet, FlatList } from "react-native";
import { useCallback, useState } from "react";
import { CategorySelect } from "../components/categorySelect";
import { ListHeader } from "../components/listHeader";
import { Appointment } from "../components/appointment";
import { ListDivider } from "../components/listDivider";
import { ICategoriesProps } from "../utils/categories";
import { ParamListBase, useFocusEffect } from "@react-navigation/native";
import { Header } from "../components/header";
import { IAppointment } from "../interfaces/appointment.interfaces";
import { StorageKeys } from "../enums/storage";
import { api } from "../services/api.services";
import { IGuildWidget } from "../interfaces/guilds.interfaces";
import { theme } from "../styles/style";
import { DrawerScreenProps } from '@react-navigation/drawer';

import Storage from "../utils/storage";

type Props = {
    data: IGuildWidget;
};

export function Home({ navigation }: DrawerScreenProps<ParamListBase>) {

    const [category, setCategory] = useState<ICategoriesProps>();
    const [appointment, setAppointment] = useState<IAppointment[]>([]);
    const [appointmentFilter, setAppointmentFilter] = useState<IAppointment[]>([]);

    useFocusEffect(useCallback(() => {
        getAppointments();
    }, []));

    async function getAppointments() {
        let appointmentStorage = await Storage.get(StorageKeys.gameplay_appointment) as IAppointment[] | [];
        if (appointmentStorage) {

            for (let appointment of appointmentStorage) appointment['membersOnly'] = await fetchGuildInfo(appointment.guild.id);

            setAppointment(appointmentStorage);
            setAppointmentFilter(appointmentStorage);
        };
    };

    function handleCategorySelect(category: ICategoriesProps) {
        setCategory(category);
        setAppointmentFilter(appointment.filter(element => element.category.title == category.title))
    };

    function handleAppointmentDetails(appointment: IAppointment) {
        navigation.navigate("AppointmentDetails", { appointment });
    };

    function handleMenuOpen() {
        navigation.openDrawer();
    };

    async function fetchGuildInfo(guildID: string): Promise<string> {
        return await api.get(`/guilds/${guildID}/widget.json`).then(({ data }: Props) => {
            return data.presence_count.toString();
        });
    };

    return (
        <View style={styles.containerInitial}>

            <Header dynamicMenu={handleMenuOpen} />

            <View style={styles.container}>

                <View style={styles.containerCategory}>
                    <CategorySelect categorySelect={category} dynamicPress={handleCategorySelect} />
                </View>

                <View style={styles.containerLista}>
                    <ListHeader style={{ marginBottom: 17 }} title="Partidas agendadas" subtitle={`Total ${appointmentFilter?.length}`} />

                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={appointmentFilter}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider style={{ marginVertical: 10 }} />}
                        renderItem={({ item }) => (
                            <Appointment data={item} onPress={() => handleAppointmentDetails(item)} />
                        )}
                    />

                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerInitial: {
        flex: 1,
        paddingTop: 65,
        backgroundColor: theme.colors.secondary100,
        paddingHorizontal: 15
    },
    container: {
        flex: 1
    },
    containerCategory: {
        paddingVertical: 27
    },
    containerLista: {
        flex: 1
    }
});