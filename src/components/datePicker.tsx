import { StyleSheet, View, Text, ViewProps, Platform, TouchableOpacity } from "react-native";
import { theme } from "../styles/style";
import { useState } from "react";
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";
import { format } from "date-fns";

import ptBr from "date-fns/locale/pt-BR";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Props = ViewProps & {
    title: string;
    mode: any;
    changeElement: (date: Date) => void;
};

export function DatePicker({ title, style, mode = "date", changeElement }: Props) {
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const onChange = (event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === "android") setShowDatePicker(oldState => !oldState)

        setDate(date ?? new Date());
        changeElement(date ?? new Date());
    };

    function handleDateAndroid() {
        setShowDatePicker(oldState => !oldState);
    };

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <GestureHandlerRootView>
                <RectButton>
                    <View style={[styles.containerData, style]} >

                        {
                            Platform.OS === "android" && (
                                <View>

                                    {
                                        showDatePicker && (
                                            <DateTimePicker
                                                value={date}
                                                mode={mode}
                                                display="default"
                                                onChange={onChange}
                                            />
                                        )
                                    }

                                    <TouchableOpacity style={styles.containerAndroid} onPress={handleDateAndroid}>
                                        <Text style={styles.inputAndroid}>
                                            {format(date, (mode == "date" ? "dd/MM/yy" : "HH:mm"), { locale: ptBr })}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }


                        {
                            (Platform.OS === "ios") && (
                                <DateTimePicker
                                    value={date}
                                    mode={mode}
                                    display="calendar"
                                    onChange={onChange}
                                />
                            )
                        }

                    </View>
                </RectButton>
            </GestureHandlerRootView>



        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        paddingVertical: 10
    },
    containerData: {
        borderRadius: 7,
        backgroundColor: theme.colors.secondary40,
        height: 55,
        borderWidth: 2,
        borderColor: theme.colors.secondary50,
        fontSize: 13,
        color: theme.colors.heading,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    containerAndroid: {
        backgroundColor: theme.colors.secondary80,
        paddingHorizontal: 10,
        marginLeft: 10,
        alignItems: "center",
        paddingVertical: 6,
        borderRadius: 7
    },
    inputAndroid: {
        fontFamily: theme.fonts.text500,
        color: theme.colors.heading
    }
});