import { ReactNode, createContext, useContext, useMemo, useState } from "react"
import { User } from "../types/user";

type AuthContextData = {
    user: User;
};

type Props = {
    children: ReactNode
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User>({} as User);

    const authContextValue = useMemo(() => {
        return { user };
    }, [user]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
};

export const AuthContext = createContext({} as AuthContextData);