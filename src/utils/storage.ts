import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "../enums/storage";

const Storage = {
    get: async (key: StorageKeys): Promise<any> => {
        try {
            let elements = await AsyncStorage.getItem(key);
            return (elements) ? JSON.parse(elements) : elements;
        } catch { return await AsyncStorage.getItem(key); }
    },
    set: async (key: StorageKeys, value: string): Promise<void> => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch { return }
    }
};

export default Storage;