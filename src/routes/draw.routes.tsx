import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerCustom } from "../components/drawerCustom";
import { Home } from "../screens/home";

const Drawer = createDrawerNavigator();

export default function DrawRoutes() {
    return <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} drawerContent={props => <DrawerCustom {...props} />}   >
        <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator >
};