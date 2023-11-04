import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import { Signin } from '../screens/signin';
import StackRoutes from './stack.routes';

export default function Routes() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user.id ? <StackRoutes /> : <Signin />}
        </NavigationContainer>
    )
};

