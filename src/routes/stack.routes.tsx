import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppointmentDetails } from "../screens/appointmentDetails";
import { AppointmentCreate } from "../screens/appointmentCreate";
import DrawRoutes from "./draw.routes";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="Stack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Stack" component={DrawRoutes} />
            <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
            <Stack.Screen name="AppointmentCreate" component={AppointmentCreate} />
        </Stack.Navigator>
    );
};