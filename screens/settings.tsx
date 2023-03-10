import React, { useContext, useState } from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import { Colors } from '../components/styles';
import MainContainer from '../components/mainContainer';
import StyledText from '../components/settings/styledText';
import SettingsItem from '../components/settings/settingsItem';
import SettingsButton from '../components/settings/settingsButton';
import { ThemeContext, ThemeContextValue } from '../contexts/themeContext';


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

    const { theme, updateTheme } = useContext<ThemeContextValue>(ThemeContext)
    let activeColors = Colors[theme.mode];

    const [ isActive, setActive ] = useState(theme.mode === "light")

    const toggleSwitch = () => {
        updateTheme(null);
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
                            value={isActive && !theme.system}
                            onValueChange={toggleSwitch}
                            thumbColor={theme.mode === "dark" ? activeColors.brand : activeColors.light }
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
                onPress={() => updateTheme({mode: "light", system: false})}
                label="Light"
                isActive={theme.mode === "light" && !theme.system}
                icon="lightbulb-on" 
            />
            <SettingsButton
                onPress={() => updateTheme({mode: "dark", system: false})} 
                label="Dark"
                isActive={theme.mode === "dark" && !theme.system}
                icon="weather-night" 
            />
            <SettingsButton 
                onPress={() => updateTheme({mode: "", system: true})}
                label="System"
                isActive={theme.system}
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