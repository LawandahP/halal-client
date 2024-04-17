import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../contexts/themeContext'
import { Colors } from './styles'


interface CustomSwitchProps {
  selectionMode: number;
  option1: string;
  option2: string;
  onSelectSwitch: (value: number) => void;
  style?: ViewStyle;
}

export default function TabSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
  style,
}: CustomSwitchProps) {

    const {theme} = useTheme()
    let activeColors = Colors[theme.mode]
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = (value: number) => {
        setSelectionMode(value);
        onSelectSwitch(value);
    };

    return (
        <View
            style={[
                {
                    height: 50,
                    marginVertical: 10,
                    width: '100%',
                    backgroundColor: activeColors.secondary,
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                },
                style,
            ]}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                flex: 1,
                backgroundColor: getSelectionMode === 1 ? activeColors.brand : activeColors.secondary,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text
                    style={{
                        color: getSelectionMode === 1 ? 'white' : activeColors.darkLight,
                        fontSize: 16,
                    }}>
                    {option1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(2)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode === 2 ?  activeColors.brand : activeColors.secondary,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: getSelectionMode === 2 ? 'white' : activeColors.darkLight,
                        fontSize: 16,
                    }}>
                    {option2}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
