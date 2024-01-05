import React from 'react';
import {Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
import { Colors } from '../styles';
import { useTheme } from '../../contexts/themeContext';



interface CustomBtnProps {
    onPress: any;
    text: string;
    type: 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
    bgColor: string;
    fgColor: string;
    loading?: boolean;
}
const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor, loading}: CustomBtnProps) => {
    const { theme } = useTheme()
    let activeColors = Colors[theme.mode]
    
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
    
    {   loading ? 
        <ActivityIndicator size="large" color={activeColors.light}/>:
        <Text
            style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? {color: fgColor} : {},
        ]}>
            {text}
        </Text>
    }
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_PRIMARY: {},

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;