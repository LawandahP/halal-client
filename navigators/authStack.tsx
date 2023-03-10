import React from 'react';

import Login from '../screens/login';
import SignUp from '../screens/signup';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../components/styles';

import BottomStack from './tabNavigator';
import Welcome from '../screens/welcome';


type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: { sort: 'latest' | 'top' } | undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {

    let activeColors = Colors;
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "transparent",
                    },
                    headerTintColor: activeColors.tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    // headerLeftContainerStyle: {
                    //     paddingLeft: 20
                    // },
                }}
                initialRouteName='Login'>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack