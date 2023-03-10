import React, { useState } from 'react'
import { StyleSheet, Switch, View, TouchableOpacity } from 'react-native'
import { Colors } from '../components/styles';
import MainContainer from '../components/mainContainer';
import StyledText from '../components/settings/styledText';
import SettingsItem from '../components/settings/settingsItem';
import SettingsButton from '../components/settings/settingsButton';


interface SectionProps {
    children: any
}

const SettingsSection = (props: SectionProps) => {
  
    return (
        <View style={{
            borderRadius: 20,
            overflow: "hidden",
            marginTop: 10,
            marginBottom: 25,
        }}>
            {props.children}
        </View>
    )
}
const Settings = () => {

    const [ isActive, setActive ] = useState(false)
    
    const theme = {mode: "dark"}
    let activeColors = Colors[theme.mode];

    const toggleSwitch = () => {
        setActive((previousState) => !previousState);
    }

  return (
    <MainContainer styles={styles.container}>
        <StyledText
            styles={{color: activeColors.brand}}
            small
            bold
        >
            User
        </StyledText>
        <SettingsSection>
            <SettingsItem label='Name'>
                <StyledText>
                    Githaiga Kairuthi
                </StyledText>
            </SettingsItem>

            <SettingsItem label='Date Joined'>
                <StyledText>
                    Jan Thur 19 2021
                </StyledText>
            </SettingsItem>
        </SettingsSection>

        <StyledText
            styles={{color: activeColors.brand}}
            small
            bold
        >
            Theme Switch
        </StyledText>
            <SettingsSection>
                <SettingsItem label='Dark Mode'>
                    <StyledText>
                        <Switch 
                            value={isActive}
                            onValueChange={toggleSwitch}
                            thumbColor={isActive ? activeColors.brand : activeColors.light }
                            ios_backgroundColor={activeColors.primary}
                            trackColor={{
                                false: activeColors.darkLight,
                                true: activeColors.primary
                            }}/>
                    </StyledText>
                </SettingsItem>
            </SettingsSection>

        <StyledText
            styles={{color: activeColors.brand}}
            small
            bold
        >
            Theme Settings
        </StyledText>
        <SettingsSection>
            <SettingsButton 
                label="Light"
                isActive={true}
                icon="lightbulb-on" 
            />
            <SettingsButton 
                label="Dark"
                isActive={true}
                icon="weather-night" 
            />
            <SettingsButton 
                label="System"
                isActive={true}
                icon="theme-light-dark" 
            />
        </SettingsSection>

    </MainContainer>
  )
}


const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
})
export default Settings