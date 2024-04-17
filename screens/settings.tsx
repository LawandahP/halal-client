import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Alert, I18nManager, StyleSheet, View } from 'react-native'
import { Colors } from '../components/styles';
import MainContainer from '../components/mainContainer';
import StyledText from '../components/settings/styledText';
import SettingsItem from '../components/settings/settingsItem';
import SettingsButton from '../components/settings/settingsButton';
import { ThemeContext, ThemeContextValue } from '../contexts/themeContext';

import { useTranslations } from '../contexts/localizationContext';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { storedData } from '../config/asyncStorage';
import { useAuth } from '../contexts/authContext';


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

interface SettingProps {
    navigation: any
}

// Enable RTL support
// I18nManager.forceRTL(true);


const Settings = (props: SettingProps) => {
    const { t, selectedLanguage, changeLanguage } = useTranslations();
    const { userInfo, getUserInfo } = useAuth()

    const LANGUAGES = [
        { code: "en", label: "English"},
        { code: "ar", label: "عربي"}
    ]

    const { theme, updateTheme } = useContext<ThemeContextValue>(ThemeContext)
    let activeColors = Colors[theme.mode];

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: t('settings')
        })
    })

    

    useEffect(() => {
        getUserInfo()
        console.log(userInfo)
    }, [])

  return (
    <MainContainer styles={styles.container}>
        <StyledText
            styles={{color: activeColors.brand}}
            small
            bold
        >
            {t('user')}
        </StyledText>
        <SettingsSection>
            <SettingsItem label={t('name')}>
                <StyledText>
                    {userInfo?.full_name}
                </StyledText>
            </SettingsItem>

            <SettingsItem label={t('date_joined')}>
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
            {t('theme_settings')}
        </StyledText>
        <SettingsSection>
            <SettingsButton 
                onPress={() => updateTheme({mode: "light", system: false})}
                label={t('light')}
                isActive={theme.mode === "light" && !theme.system}
                icon="lightbulb-on" 
            />
            <SettingsButton
                onPress={() => updateTheme({mode: "dark", system: false})} 
                label={t('dark')}
                isActive={theme.mode === "dark" && !theme.system}
                icon="weather-night" 
            />
            <SettingsButton 
                onPress={() => updateTheme({mode: "", system: true})}
                label={t('system')}
                isActive={theme.system}
                icon="theme-light-dark" 
            />

        </SettingsSection>
        
        <StyledText
            styles={{color: activeColors.brand}}
            small
            bold
        >
            {t('language_settings')}
        </StyledText>
        <SettingsSection>
            {LANGUAGES.map((language) => {
                const activeLanguage = selectedLanguage === language.code
                return (
                    <SettingsButton 
                        key={language.code}
                        onPress={() => changeLanguage(language.code)}
                        label={`${language.label}`}
                        isActive={activeLanguage}
                    />
            )})}
            
            
            
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





        {/* <StyledText
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
            </SettingsSection> */}