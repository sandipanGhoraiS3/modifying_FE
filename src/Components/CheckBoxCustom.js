import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
    Image,
    Easing,
  } from "react-native";
  import React, { useState } from "react";
  import ModalPopup from "./modelPopup";
  import ButtonComp from "./ButtonComp";
  import Toast from "react-native-toast-message";
  import TextInputWithLabel from "./TextInputWithLabel";
  // import Animated from 'react-native/Libraries/Animated';
  import ApiManager from "../api/ApiManager";
  
  const CheckBoxCustom = ({ isChecked, onChange, label, phoneNumber }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [secretCode, setSecretCode] = useState("");
  
    const handleCheckBoxClick = () => {
      onChange(!isChecked);
      setModalVisible(!isChecked); // Open modal if checkbox is checked
    };
  
    const handleVerifyCode = async () => {
      // Make an HTTP request to your API
  
      try {
        const response = await ApiManager.get(
          `/api/check_passcode/${secretCode}/`
        );
  
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: "Successfully verified",
            autoHide: true,
            visibilityTime: 2000,
            position: "bottom",
            bottomOffset: 550,
          });
          setModalVisible(false); // Close the modal
        } else {
          Toast.show({
            type: "error",
            text1: "Wrong Secret code",
            autoHide: true,
            visibilityTime: 2000,
            position: "bottom",
            bottomOffset: 550,
          });
        }
      } catch {
        console.error("Error verifying secret code:", error);
        // Show an error message
        Toast.show({
          type: "error",
          text1: "An error occurred",
          autoHide: true,
          visibilityTime: 2000,
          position: "bottom",
          bottomOffset: 550,
        });
      }
    };
  
    const handleNoButtonClick = () => {
      onChange(false); // Uncheck the checkbox
      setModalVisible(false); // Close the modal
    };
  
    return (
      <>
        <TouchableOpacity
          onPress={handleCheckBoxClick}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
            left: 36,
            bottom: 10,
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: isChecked ? "#8AC8B3" : "#fff",
              borderWidth: 1,
              borderColor: "#03462F",
              borderRadius: 2,
              marginRight: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isChecked ? (
              <Text
                style={{
                  fontSize: 15,
                  color: "black",
                  marginBottom: 1,
                  bottom: 2,
                }}
              >
                ✔
              </Text>
            ) : null}
          </View>
          <Text>{label}</Text>
        </TouchableOpacity>
  
        <ModalPopup visible={modalVisible} onClose={() => setModalVisible(false)}>
          <View style={{ alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={handleCheckBoxClick}>
                <Image
                  source={require("../assets/images/x.png")}
                  style={{
                    height: 30,
                    width: 30,
                    left: 127,
                    bottom: 10,
                    alignItems: "flex-end",
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                bottom: 28,
                color: "#113832",
                fontWeight: "bold",
                justifyContent: "center",
              }}
            >
              Enter Admin Secret code{" "}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                bottom: 20,
                color: "#113832",
              }}
            >
              If you don't know, contact the admin.
            </Text>
            {/* <TextInput
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#CCCCCC",
                fontSize: 16,
                borderRadius: 6,
                paddingLeft: 86,
                paddingRight: 40,
                paddingTop: 5,
                paddingBottom: 10,
                backgroundColor: "#BFDED3",
                bottom: 10,
              }}
              keyboardType="numeric"
              maxLength={6}
              fontSize={25}
            /> */}
            <TextInputWithLabel
              // placeholder={"Six Digit Code"}
              keyboardType="numeric"
              maxLength={6}
              inputContainer={{ bottom: 30 }}
              value={secretCode}
              onChangeText={(text) => setSecretCode(text)}
              // error={"hi"}
              errorStyle={{ backgroundColor: "red", left: 100 }}
              innerTextStyle={{ fontSize: 25 }}
            />
  
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ButtonComp
                btnText={"No"}
                btnStyle={{ height: 40, width: 90 }}
                onPress={handleNoButtonClick}
              />
              <ButtonComp
                btnText={"verify"}
                btnStyle={{
                  height: 40,
                  width: 90,
                }}
                onPress={handleVerifyCode}
              />
            </View>
          </View>
        </ModalPopup>
        {<Toast />}
      </>
    );
  };
  
  export default CheckBoxCustom;
  
  const styles = StyleSheet.create({});
  