import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Colors } from './styles'

import { Ionicons } from '@expo/vector-icons';



interface Props {
    label: string,
    icon: any,
    onPress?: () => void;

}

const OpacityButton = (props:Props) => {

    const theme = {mode: "dark"}
    let activeColors = Colors[theme.mode];

    return (
   
    <TouchableOpacity onPress={props.onPress} style={{paddingVertical: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={props.icon} size={20} style={{color: activeColors.light}}/>
            <Text style={{fontSize: 15, marginLeft: 5, color: activeColors.light}}>{props.label}</Text>
        </View>
    </TouchableOpacity>
   
  )
}

export default OpacityButton