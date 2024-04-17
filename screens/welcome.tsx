import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Colors
} from '../components/styles'


// import { StatusBar } from 'expo-status-bar'
import { View, TouchableOpacity , Text, ImageBackground, StyleSheet, StatusBar, Alert } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import MainContainer from '../components/mainContainer';
import { useTheme } from '../contexts/themeContext';
import { useTranslations } from '../contexts/localizationContext';
import { UserInfoInterface } from '../constants/interface';
import { useAuth } from '../contexts/authContext';
import TextInput from '../components/textInput';
import TabSwitch from '../components/tabSwitch';
import HourlyServices from '../tabs/hourlyServices';
import MonthlyServices from '../tabs/monthlyServices';


interface HomeProps {
    navigation?: any,
}

const Welcome = (props: HomeProps) => {
    const { t } = useTranslations();

    const { theme } = useTheme()
    let activeColors = Colors[theme.mode];

    const { userInfo, getUserInfo } = useAuth()

    const [hourlyTab, setHourlyTab] = useState<number>(1);
    
    const onSelectSwitch = (value: number) => {
        setHourlyTab(value)
    }

    useEffect(() => {
        getUserInfo()
    }, [])
   
   
    return (
        <MainContainer styles={{padding: 20, paddingTop: 40}}>
            {/* <StatusBar style="dark" /> */}
            <View style={styles.welcome}>
                <Text style={{fontSize: 16, marginTop: 5, color: activeColors.light}}>{t('hello')} {userInfo?.username}</Text>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <ImageBackground 
                        source={require('../assets/images/image1.jpg')}
                        style={{width: 35, height: 35}}
                        imageStyle={{borderRadius: 25, borderWidth: 1, borderColor: activeColors.brand}}
                    />
                </TouchableOpacity>
            </View>

            <TextInput 
                placeholder={t('search')}
                icon='search'
                placeholderTextColor={activeColors.darkLight}
                style={{fontSize: 16, color: activeColors.light}} 
            />

            <View>
                <TabSwitch 
                    option1="Hourly" option2="Monthly"
                    selectionMode={1}
                    onSelectSwitch={onSelectSwitch}
                />
            </View>
            

            {hourlyTab == 1 && <HourlyServices />}
            {/* {hourlyTab == 2 && <MonthlyServices />} */}

        </MainContainer>        
    )
}

const styles = StyleSheet.create({
    welcome: {
        flexDirection:'row', 
        justifyContent: 'space-between', 
        alignContent: 'center', 
        // marginBottom: 
    },
    wrapper: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default Welcome