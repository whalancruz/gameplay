
import { View, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { CategorySelect } from "../components/categorySelect";
import { ListHeader } from "../components/listHeader";
import { Appointment } from "../components/appointment";
import { ListDivider } from "../components/listDivider";
import { ICategoriesProps } from "../utils/categories";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { Header } from "../components/header";

export function Home() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    
    const [category, setCategory] = useState<ICategoriesProps>();

    let listTeste = [
        {
            id: '1'
        },
        {
            id: '2'
        },
        {
            id: '3'
        }
    ];

    function handleCategorySelect(category: ICategoriesProps) {
        setCategory(category)
    };

    function handleAppointmentDetails() {
        navigation.navigate("AppointmentDetails");
    };

    return (
        <View style={styles.containerInitial}>

            <Header />

            <View style={styles.container}>

                <View style={styles.containerCategory}>
                    <CategorySelect categorySelect={category} dynamicPress={handleCategorySelect} />
                </View>

                <View>
                    <ListHeader style={{ marginBottom: 17 }} title="Partidas agendadas" subtitle="Total 6" />

                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={listTeste}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider style={{ marginVertical: 10 }} />}
                        renderItem={({ item }) => (
                            <Appointment onPress={handleAppointmentDetails} />
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
        paddingHorizontal: 30
    },
    container: {
        flex: 1
    },
    containerCategory: {
        paddingVertical: 27
    }
});