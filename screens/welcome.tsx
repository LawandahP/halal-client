import React, { useContext, useLayoutEffect } from 'react';
import { Colors
} from '../components/styles'


// import { StatusBar } from 'expo-status-bar'
import { View, TouchableOpacity , Text, ImageBackground, TextInput, StyleSheet, StatusBar } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import MainContainer from '../components/mainContainer';
import { ThemeContext, ThemeContextValue } from '../contexts/themeContext';
import { useTranslations } from '../contexts/localizationContext';

interface HomeProps {
    navigation?: any
}

const Welcome = (props: HomeProps) => {
    const { t } = useTranslations();

    const { theme } = useContext<ThemeContextValue>(ThemeContext)
    let activeColors = Colors[theme.mode];

   
   
    return (
        <MainContainer styles={{padding: 20, paddingTop: 40}}>
            {/* <StatusBar style="dark" /> */}
            <View style={styles.welcome}>
                <Text style={{fontSize: 16, marginTop: 5, color: activeColors.light}}>{t('hello')} Githaiga</Text>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <ImageBackground 
                        source={require('../assets/images/image1.jpg')}
                        style={{width: 35, height: 35}}
                        imageStyle={{borderRadius: 25, borderWidth: 1, borderColor: activeColors.brand}}
                    />
                </TouchableOpacity>
                
            </View>

            <View style={styles.search}>
                <Octicons 
                    name='search'
                    size={20}
                    style={{marginRight: 15, marginTop: 5}}
                    color={activeColors.brand} 
                />
                <TextInput 
                    placeholder={t('search')}
                    placeholderTextColor={activeColors.darkLight}
                    style={{fontSize: 16, color: activeColors.light}} 
                />
            </View>
        </MainContainer>


        // <StatusBar style="light" />
        // <InnerContainer>   
        //     <WelcomeImage resizeMode="cover" source={require('./../assets/images/cleaning1.jpg')} />
        //     <WelcomeContainer>
        //         <PageTitle welcome={true}>Welcome Back Githaiga!</PageTitle>
                
        //         <FormArea>
        //             <Avatar resizeMode="cover" source={require('./../assets/images/image1.jpg')} />
        //             <Line />
        //             <StyledButton onPress={handleSubmit}>
        //                 <BtnText>Logout</BtnText>
        //             </StyledButton>
        //         </FormArea>    
        //     </WelcomeContainer>
        // </InnerContainer>
        // 
  )
}

const styles = StyleSheet.create({
    search: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    
    welcome: {
        flexDirection:'row', 
        justifyContent: 'space-between', 
        alignContent: 'center', 
        marginBottom: 20
    }
})

export default Welcome