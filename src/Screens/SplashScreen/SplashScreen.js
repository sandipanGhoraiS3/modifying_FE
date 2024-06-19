import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../Constants/navigationStrings';
import styles from './styles';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {decode as base64decode} from 'base-64';
// import {handle_login} from '../../api/AuthApi';
// import {refresh_access_token} from '../../api/AuthApi';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Navigate to the login screen after the animation duration
    const timer = setTimeout(() => {
      navigation.navigate(navigationStrings.LOGIN); // Replace 'Login' with your actual login screen route name
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [fadeAnim, navigation]);

  //   const isAccessTokenExpired = (accessToken) => {
  //     const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
  //     const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
  //     const currentTime = Date.now();
  //     return currentTime > expirationTime;
  //   };

//   useEffect(() => {
    // const checkLoginStatus = async () => {
    //   try {
    //     const access_token = await AsyncStorage.getItem("access");
    //     const refresh_token = await AsyncStorage.getItem("refresh");

    //     console.log("access token: ", access_token);
    //     console.log("refresh token: ", refresh_token);

    //     if (access_token && refresh_token) {
    //       const accessExpired = isAccessTokenExpired(access_token);
    //       const refreshExpired = isAccessTokenExpired(refresh_token);

    //       console.log("accessExpired token: ", accessExpired);
    //       console.log("refreshExpired token: ", refreshExpired);

    //       if (accessExpired && refreshExpired) {
    //         Alert.alert("Session Expired", "Please log in again", [
    //           {
    //             text: "OK",
    //             onPress: () => navigation.navigate(navigationStrings.LOGIN),
    //           },
    //         ]);

    //         try {
    //           await AsyncStorage.removeItem("access");
    //           await AsyncStorage.removeItem("refresh");
    //           console.log("deleted tokens successfully");
    //         } catch (error) {
    //           console.error("Error while remove tokens:", error);
    //           throw error;
    //         }
    //       } else if (accessExpired && !refreshExpired) {
    //         try {
    //           await refresh_access_token();

    //           navigation.navigate(navigationStrings.HOME);
    //         } catch (error) {
    //           console.error("Error refreshing access token:", error);
    //           Alert.alert("Error", "Failed to refresh access token");
    //         }
    //       } else {
    //         navigation.navigate(navigationStrings.HOME);
    //       }
    //     } else {
    //       navigation.navigate(navigationStrings.LOGIN);
    //     }
    //   } catch (error) {
    //     console.error("Error checking login status:", error);
    //   }

    // };

//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 3000,
//       useNativeDriver: true,
//     }).start();

//     setTimeout(navigation.navigate(navigationStrings.LOGIN), 3000);
//   }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity: fadeAnim}}>
        <View>
          <Text style={styles.logoText}>
            <Text style={styles.largeText}>Bible S</Text>
            <Text style={styles.redText}>t</Text>
            <Text style={styles.largeText}>udy</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.withPastor}>with Pastor Ronnie</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
