import {
    StyleSheet,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Text,
  } from "react-native";
  import React from "react";
import { moderateScale, scale } from "react-native-size-matters";
//   import { scale, verticalScale, moderateScale } from "react-native-size-matters";
//   import imagePath from "../Constants/imagePath";
  
  const TextInputWithLabel = ({
    placeholder,
    onChangeText = () => {},
    rightIcon,
    leftIcon,
    inputContainer = {},
    onPressRight,
    value,
    innerTextStyle = {},
    errorStyle = {},
    leftImage = {},
    maxLength,
    error,
    // passwordsMatch,
    ...props
  }) => {
    const handleOnChangeText = (text) => {
      // If maxLength prop is provided, enforce it
      if (maxLength && text.length > maxLength) {
        text = text.slice(0, maxLength);
      }
      onChangeText(text);
    };
    return (
      <View style={{ ...styles.inputContainer, ...inputContainer }}>
        <TextInput
          style={{ ...styles.textInput, ...innerTextStyle }}
          placeholder={placeholder}
          placeholderTextColor="#3B4541"
          maxLength={maxLength}
          onChangeText={handleOnChangeText}
          {...props}
        />
        {
          <Image
            source={leftIcon}
            style={{ ...styles.leftImageStyle, ...leftImage }}
          />
        }
        {!!rightIcon ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRight}>
            <Image
              style={{ right: 55, tintColor: "rgba(0, 0, 0, 0.4)" }}
              source={rightIcon}
            />
          </TouchableOpacity>
        ) : null}
        {error && (
          <Text style={{ ...styles.errorText, ...errorStyle }}>{error}</Text>
        )}
      </View>
    );
  };
  
  export default TextInputWithLabel;
  
  const styles = StyleSheet.create({
    inputContainer: {
      // width: "100%",
      marginTop: 30,
      paddingHorizontal: 35,
      alignItems: "center",
  
      flexDirection: "row",
      // flex: 1,
    },
    textInput: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#CCCCCC",
      fontSize: 16,
      borderRadius: 6,
      paddingLeft: 45,
      paddingRight: 40,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#BFDED3",
    },
    errorText: {
      color: "red",
      fontSize: 12,
      top: 35,
      right: 280,
    },
    leftImageStyle: { right: scale(277) },
  });
  