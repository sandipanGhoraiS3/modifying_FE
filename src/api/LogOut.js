import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("access");
    await AsyncStorage.removeItem("refresh");
    Alert.alert("Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};