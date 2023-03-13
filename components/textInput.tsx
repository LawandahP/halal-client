import React, { FC, useContext } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { Colors, IconButton, InputIcon, InputLabel, StyledTextInput } from './styles';

import { Octicons, Ionicons } from '@expo/vector-icons'
import { ThemeContext, ThemeContextValue } from '../contexts/themeContext';



interface Input {
    label: string;
    icon?: any;
    isPassword?: boolean;
    hidePassword?: boolean;
    setHidePassword?: any;
    isDate?: boolean;
    isSearch?: boolean;
    showDatePicker?: () => void;

    placeholder: any
    placeHolderTextColor: any
    onChangeText: any;
    onBlur: any;
    value: any;
    keyboardType?: string
    editable?: boolean
    secureTextEntry?: boolean
}


const TextInput = (props:Input) => {
  const { theme } = useContext<ThemeContextValue>(ThemeContext)
  let activeColors = Colors[theme.mode];
  
  const handleShowPassword = () => {
    props.setHidePassword(!props.hidePassword)
  }

  return (
    <View>
      <InputIcon>
        <Octicons name={props.icon} size={props.isSearch ? 20 : 30} color={Colors.brand}/>
      </InputIcon>
      <InputLabel style={{color: activeColors.darkLight}}>{props.label}</InputLabel>
        <StyledTextInput 
            style={{
                backgroundColor: activeColors.secondary,
                color: activeColors.light
            }} 
            label={props.label}
            icon={props.icon}
            isPassword={props.isPassword}
            hidePassword={props.hidePassword}
            setHidePassword={props.setHidePassword}
            isDate={props.isDate}
            isSearch={props.isSearch}
            showDatePicker={props.isSearch}

            placeholder={props.placeholder}
            placeHolderTextColor={props.placeHolderTextColor}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            value={props.value}
            keyboardType={props.keyboardType || "default"}
            editable={props.editable}
            secureTextEntry={props.secureTextEntry}
          />
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