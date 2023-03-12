import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { Alert, Appearance, I18nManager } from 'react-native'
import React, { useState, useEffect } from 'react';
// import AuthStack from './navigators/authStack';
import AppStack from './navigators/appStack';
import { Theme, ThemeContext } from './contexts/themeContext';
import { getData, storedData } from './config/asyncStorage';
import { LocalizationContext } from './contexts/localizationContext';
import i18n from './i18n';

import * as Updates from 'expo-updates'
import { I18nextProvider } from 'react-i18next';
// keep splash screenvisible while fetching resources

SplashScreen.preventAutoHideAsync();




export default function App() {
  // const localeData = getData("locale")
  // Alert.alert(`${localeData}`)
  // const [ isRTL, setIsRTL] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>('en');

  const changeLanguage = async (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang)
    if (i18n.language === 'ar') {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
    // i18n.changeLanguage(lang).then(() => {
    //   I18nManager.forceRTL(i18n.language === 'ar')
    // });
    // RNRestart.Restart();
    storedData("locale", lang)
    Updates.reloadAsync();
   
  };

  const [theme, setTheme] = useState<Theme>({ mode: "light", system: false});

  const updateTheme = (newTheme: Theme | null) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode, system: false };
    } else {
      if (newTheme.system) {
        const systemColorScheme = Appearance.getColorScheme();
        mode = systemColorScheme === "dark" ? "dark" : "light"

        newTheme = { ...newTheme, mode}
      } else {
        newTheme = { ...newTheme, system: false}
      }
    }
    setTheme(newTheme);

    storedData("theme", newTheme)
  };

  // monitor system for changes 
  if (theme.system) {
    Appearance.addChangeListener((colorScheme) => {
      updateTheme({system: true, mode: colorScheme})
    })
  }

  const getTheme = async () => {
    try {
      const themeData = await getData("theme")
      if (themeData) {
        updateTheme(themeData)
      }
    } catch(message: any) {
      Alert.alert(message)
    } finally {
      await setTimeout(() => SplashScreen.hideAsync(), 1)
    }
  }

  const getLocale = async () => {
    try {
      const localeData = await getData("locale")
      if (localeData) {
        changeLanguage(localeData)
      }
    } catch(message: any) {
      Alert.alert(message)
    }
  }

  useEffect(() => {
    getTheme();
    getLocale();
  }, [])

  return (
      // <AuthStack />
      <LocalizationContext.Provider value={{t: i18n.t, selectedLanguage, changeLanguage}}>
      {/* <I18nextProvider i18n={i18n}> */}
        <ThemeContext.Provider value={{theme, updateTheme}}>
          <AppStack />
        </ThemeContext.Provider>
      {/* </I18nextProvider> */}
        
    </LocalizationContext.Provider>
        
      
    
  );
}

