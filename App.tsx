import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { Alert, Appearance } from 'react-native'
import React, { useState, useEffect } from 'react';
// import AuthStack from './navigators/authStack';
import AppStack from './navigators/appStack';
import { Theme, ThemeContext } from './contexts/themeContext';
import { getData, storedData } from './config/asyncStorage';

// keep splash screenvisible while fetching resources

SplashScreen.preventAutoHideAsync();

export default function App() {

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

  useEffect(() => {
    getTheme();
  }, [])

  return (
      // <AuthStack />
      <ThemeContext.Provider value={{theme, updateTheme}}>
        <AppStack />
      </ThemeContext.Provider>
      
    
  );
}

