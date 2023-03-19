import React from 'react'
import AuthStack from './authStack'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../contexts/authContext'
import AppStack from './appStack'

const AppNav = () => {
    const { userToken } = useAuth()

    return (
        <NavigationContainer>
            { 
                userToken ? 
                <AppStack /> :
                <AuthStack />
            }
        </NavigationContainer>
        
    )
}

export default AppNav