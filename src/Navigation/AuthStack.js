import * as React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationStrings from "../Constants/navigationStrings";
import Login from "../Screens/Login/Login";
import SignUp from "../Screens/SignUp/SignUp";
import SplashScreen from "../Screens/SplashScreen/SplashScreen";
import ForgetPassword from "../Screens/ForgetPassword/ForgetPassword";
import Home from "../Screens/Home/Home";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function AuthStack() {

  useEffect(() => {
    StatusBar.setHidden(true, 'fade');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <StatusBar hidden={true} />
    <Stack.Navigator
      initialRouteName={navigationStrings.SPLASH}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={navigationStrings.SPLASH} component={SplashScreen} />
      <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
      <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp} />
      <Stack.Screen
        name={navigationStrings.FORGETPASSWORD}
        component={ForgetPassword}
      />

      <Stack.Screen name={navigationStrings.HOME} component={Home} />
    </Stack.Navigator>
    </SafeAreaView>
  );
}
