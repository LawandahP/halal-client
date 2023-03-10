import React from 'react'
import { Colors } from '../styles';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import StyledText from './styledText';


import { MaterialCommunityIcons } from '@expo/vector-icons'




interface TextProps {
    label: string;
    icon: any;
    isActive: boolean;
}

const SettingsButton = (props:TextProps) => {

    const theme = {mode: "dark"}
    let activeColors = Colors[theme.mode];

    return (
        <TouchableOpacity
            style={[
                {backgroundColor: activeColors.secondary},
                styles.settingsItem
            ]}
            {...props}
        >
            <View style={styles.labelGroup}>
                <MaterialCommunityIcons 
                    style={styles.icon}
                    name={props.icon} size={24} 
                    color={activeColors.darkLight} 
                />
                    <StyledText
                        styles={[{
                            color: activeColors.darkLight
                        }]}>
                        {props.label}
                    </StyledText>
            </View>

            <MaterialCommunityIcons 
                    style={styles.icon}
                    name={props.isActive ? "checkbox-marked-circle" : "checkbox-blank"} size={24} 
                    color={props.isActive ? activeColors.brand : activeColors.tertiary} 
            />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    labelGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 15
    },
    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 25,
        marginBottom: 2
    }    
})

export default SettingsButton