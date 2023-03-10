import React from 'react'
import { Colors } from '../styles';
import { StyleSheet, View } from 'react-native';
import StyledText from './styledText';




interface TextProps {
    label?: string;
    children: any;
}

const SettingsItem = (props:TextProps) => {

    const theme = {mode: "dark"}
    let activeColors = Colors[theme.mode];

    return (
        <View
            style={[
                {backgroundColor: activeColors.secondary},
                styles.settingsItem
            ]}
            {...props}
        >
            <StyledText
                styles={[{
                    color: activeColors.darkLight
                }]}>
                {props.label}
            </StyledText>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({

    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 25,
        marginBottom: 2
    }    
})

export default SettingsItem