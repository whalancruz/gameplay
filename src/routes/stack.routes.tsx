import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Signin } from "../screens/signin";
import { Home } from "../screens/home";
import { theme } from "../styles/style";
import { AppointmentDetails } from "../screens/appointmentDetails";
import { AppointmentCreate } from "../screens/appointmentCreate";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return <Stack.Navigator initialRouteName="Signin" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.secondary100 } }}>
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
        <Stack.Screen name="AppointmentCreate" component={AppointmentCreate} />
    </Stack.Navigator>
};