import React, { FC, useContext, useState } from 'react'
import { BtnText, Colors, Container, ExtraText, ExtraView, FormArea, InnerContainer, Line, MsgBox, PageLogo, PageTitle, StyledButton, SubTitle, TextLink, TextLinkContent } from '../components/styles'
import { Formik } from 'formik'
import TextInput from '../components/textInput'

import { Fontisto } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { ThemeContext, ThemeContextValue } from '../contexts/themeContext'
import { useTranslations } from '../contexts/localizationContext'
// import KeyBoardWrapper from '../components/keyboardWrapper'


interface LoginProps {
    navigation: any;
}


const Login = (props: LoginProps) => {
    const { t } = useTranslations();

    const { theme } = useContext<ThemeContextValue>(ThemeContext)
    let activeColors = Colors[theme.mode];

    const [ hidePassword, setHidePassword] = useState(true)
    const initialVals: any = {
        email: "",
        password: ""
    }

    const handleSubmit = () => {

    }
  return (

    // <KeyBoardWrapper>
        <Container style={{backgroundColor: activeColors.primary}}>
            <StatusBar style={theme.mode === "dark" ? "light" : "dark"}/>
            <InnerContainer>
                {/* <PageLogo resizeMode="cover" source={require('./../assets/images/image1.jpg')} /> */}
                <PageTitle>Halal</PageTitle>
                <SubTitle style={{color: activeColors.light}}>{t('login')}</SubTitle>

                <Formik
                    initialValues={initialVals}
                    onSubmit={(values) => {
                        console.log(values)
                        props.navigation.navigate("Welcome")
                    }}>
                        {({handleChange, handleBlur, values}) => 
                            <FormArea>
                                <TextInput 
                                    label={t("email")}  
                                    icon="mail"
                                    placeholder="johndoe@gmail.com"
                                    placeHolderTextColor={activeColors.light}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType='email-address'
                                />

                                <TextInput 
                                    label={t("password")} 
                                    icon="lock"
                                    isPassword={true}
                                    placeholder={t("enter_password")}
                                    placeHolderTextColor={activeColors.darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    setHidePassword={setHidePassword}
                                    secureTextEntry={hidePassword}
                                    hidePassword={hidePassword}
                                />

                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <BtnText>{t("submit")}</BtnText>
                                </StyledButton>

                                <Line />

                                <StyledButton google={true} onPress={handleSubmit}>
                                    <Fontisto name="google" color={activeColors.light} size={25}/>
                                    <BtnText google>{t("sign_in_with_google")}</BtnText>
                                </StyledButton>

                                <ExtraView>
                                    <ExtraText style={{color: activeColors.light}}>{t("sign_in_with_google")}</ExtraText>
                                    <TextLink onPress={() => props.navigation.navigate("SignUp")}>
                                        <TextLinkContent> {t("sign_up")}</TextLinkContent>
                                    </TextLink>
                                </ExtraView>

                            </FormArea>
                        }
                    </Formik>
                <FormArea>

                </FormArea>
            </InnerContainer>
        </Container>
    // {/* </KeyBoardWrapper> */}
  )
}

export default Login