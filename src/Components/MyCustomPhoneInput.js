import React, { useState } from "react";
import { View, Text } from "react-native";
import PhoneInput from "react-native-phone-number-input";

const MyCustomPhoneInput = ({ maxLength, minLength }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isError, setIsError] = useState(false);
  
    const handleOnChangeText = (text) => {
      if (text.length <= maxLength) {
        setPhoneNumber(text);
        setIsError(text.length < minLength);
      }
    };
  
    return (
      <View style={{alignItems: 'center', justifyContent: 'center' }}>
        <PhoneInput
          defaultValue={phoneNumber}
          defaultCode="IN"
          onChangeText={handleOnChangeText}
        />
        {isError && (
          <Text style={{ color: 'red', top: 10}}>
            Phone number must be {maxLength} digits
          </Text>
        )}
      </View>
    );
  };

export default MyCustomPhoneInput;

