import React, { FC } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { Colors, IconButton, InputIcon, InputLabel, StyledTextInput } from './styles';

import { Octicons, Ionicons } from '@expo/vector-icons'



interface Input {
    label: string;
    icon?: any;
    isPassword?: boolean;
    hidePassword?: boolean;
    setHidePassword?: any;
    isDate?: boolean;
    showDatePicker?: () => void;
}


const TextInput = (props:Input) => {

  const handleShowPassword = () => {
    props.setHidePassword(!props.hidePassword)
  }

  return (
    <View>
      <InputIcon>
        <Octicons name={props.icon} size={30} color={Colors.brand}/>
      </InputIcon>
      <InputLabel>{props.label}</InputLabel>
      {!props.isDate && <StyledTextInput {...props}/>}
      {
        props.isDate && 
        <TouchableOpacity onPress={props.showDatePicker}>
          <StyledTextInput {...props}/>
        </TouchableOpacity>
      }
      { props.isPassword && (
        <IconButton onPress={handleShowPassword}>
          <Ionicons size={30} 
            color={Colors.darkLight} 
            name={props.hidePassword ? "md-eye" : "md-eye-off" }
          />
        </IconButton>
      )}
    </View>
  )
}

export default TextInput