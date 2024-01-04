import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native';
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
    error?: string;

    placeholder: any
    onChangeText: any;
    onBlur: any;
    value: any;
    keyboardType?: string
    editable?: boolean
    secureTextEntry?: boolean
    // props: any
}


const TextInput = (props:Input) => {
  const { theme } = useContext<ThemeContextValue>(ThemeContext)
  let activeColors = Colors[theme.mode];
  
  const handleShowPassword = () => {
    props.setHidePassword(!props.hidePassword)
  }

  return (
    <View>
      <Text style={[styles.label, {color: props.error ? "red" : activeColors.darkLight}]}>{props.label}</Text>
      <View 
        error={props.error}
        style={[
          styles.inputContainer, 
          {
            backgroundColor: activeColors.secondary,
            borderWidth: props.error ? 1 : 0,
            borderColor: props.error ? "red" : ""
          }]}>
        <InputIcon>
          <Octicons name={props.icon} size={props.isSearch ? 20 : 30} color={Colors.brand}/>
        </InputIcon>
        
        <StyledTextInput 
            placeholderTextColor={activeColors.darkLight}
            style={{
                color: activeColors.light,
                flex: 1
            }} 
            {...props}
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
      {props.error && (
              <Text style={styles.error}>{props.error[0]}</Text>
          )}
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
      color: 'red',
      marginTop: -8,
      marginBottom: 10
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
  },
  inputContainer: {
    height: 60,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,

  }

})

export default TextInput