import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

import { Feather } from '@expo/vector-icons/'
import { useTheme } from '../contexts/themeContext'
import { Colors } from './styles'
import { color } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native'

interface SliderProps {
    label: string
    icon: any
}

const Slider = (props:SliderProps) => {
    const {theme} = useTheme()
    let activeColors = Colors[theme.mode]

    return (
        <TouchableOpacity>
            <View style={[styles.card, { backgroundColor: activeColors.secondary }]}>
                <Image
                    source={props.icon}
                    style={{
                        width: 55,
                        height: 55,
                        borderRadius: 10,
                        marginRight: 8,
                    }}
                />
                <Text style={{color: activeColors.light, fontSize: 18}}>{props.label}</Text>
            </View>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: {
        flexDirection:'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20,
        borderRadius: 5
    },
})
export default Slider