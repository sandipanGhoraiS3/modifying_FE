import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { decode as base64decode } from "base-64";

global.atob = base64decode;

export const user_login = async (data) => {
  try {
    const response = await ApiManager.post("/api/login/", data);
    console.log(response.data);
    await AsyncStorage.setItem("access", response.data.access);
    await AsyncStorage.setItem("refresh", response.data.refresh);
    console.log(
      "Tokens stored in AsyncStorage:",
      response.data.access,
      response.data.refresh
    );

    const access_token = await AsyncStorage.getItem("access");
    console.log("Old access token is:", access_token);

    return response.data;
  } catch (error) {
    console.error("Error in user_login:", error);
    throw error;
  }
};

export const refresh_access_token = async () => {
  try {
    const refresh_token = await AsyncStorage.getItem("refresh");
    if (!refresh_token) {
      throw new Error("Refresh token not found");
    }
    const response = await ApiManager.post("/api/token/refresh/", {
      refresh: refresh_token,
    });

    console.log(response);
    // Update access token in AsyncStorage
    await AsyncStorage.setItem("access", response.data.access);
    console.log(
      "New access token stored in AsyncStorage:",
      response.data.access
    );
    return response.data.access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

const isAccessTokenExpired = (accessToken) => {
  const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
  const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
  const currentTime = Date.now();
  return currentTime > expirationTime;
};

export const handle_login = async (data) => {
  try {
    const access_token = await AsyncStorage.getItem("access");
    console.log("Old access token is:", access_token);
    const refresh_token = await AsyncStorage.getItem("refresh");
    console.log("Old refresh token is:", refresh_token);

    if (!access_token) {
      // If access token is not available, perform login
      return await user_login(data);
    } else {
      // If access token is available, check if it's expired
      const accessisExpired = isAccessTokenExpired(access_token);
      const refreshisExpired = isAccessTokenExpired(refresh_token); // Corrected variable name here
      console.log("accessisExpired: ", accessisExpired);
      console.log("refreshisExpired: ", refreshisExpired);
      if (accessisExpired && refreshisExpired) {
        // If both access and refresh tokens are expired, attempt to refresh them
        return await user_login(data);
      } else if (accessisExpired && !refreshisExpired) {
        // If only access token is expired, attempt to refresh it
        return await refresh_access_token();
      } else {
        // If access token is not expired, return it
        return { access: access_token };
      }
    }
  } catch (error) {
    console.error("Error handling login:", error);
    throw error;
  }
};
