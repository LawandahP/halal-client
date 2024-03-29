import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


export const storedData = async (key: string, value: any) => {
    try {
        const jsonVal = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonVal)
    } catch(message: any) {
        Alert.alert(message)

    }
}

export const getData = async (key: string) => {
    try {
        const jsonVal = await AsyncStorage.getItem(key);
        return jsonVal != null ? JSON.parse(jsonVal) : null;
    } catch(message: any) {
        Alert.alert(message)
    }
}

export const BASE_URL = "http://localhost:8000/api/v1"