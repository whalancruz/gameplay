import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"
import { StorageKeys } from "../enums/storage";
import { api } from "../services/api.services";
import { IUser } from "../interfaces/user.interfaces";

import Storage from "../utils/storage";

export type AuthContextData = {
    user: IUser;
    setUser: (user: IUser) => void;
};

type Props = {
    children: ReactNode
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<IUser>({} as IUser);

    const authContextValue = useMemo(() => {
        return {
            user,
            setUser
        };
    }, [user]);


    useEffect(() => {
        async function getUserStorage() {
            let userStorage = await Storage.get(StorageKeys.gameplay_user) as IUser;
            if (userStorage) {
                api.defaults.headers.common.Authorization = `Bearer ${userStorage.token}`;
                setUser(userStorage);
            };
        };
        getUserStorage();
    }, [])


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