import 'react-native-gesture-handler';
import React, { useState } from 'react';
import AuthStack from './navigators/authStack';
import AppStack from './navigators/appStack';
import { ThemeContext } from './contexts/themeContext';

export default function App() {

  const [ theme, setTheme ] = useState({mode: "dark"});

  const updateTheme = (newTheme: any) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark"
      newTheme = {mode}
    }
    setTheme(newTheme)
  }
  return (
      // <AuthStack />
      <ThemeContext.Provider value={{theme, updateTheme}}>
        <AppStack />
      </ThemeContext.Provider>
      
    
  );
}

