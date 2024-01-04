import { FC, useContext, useState } from 'react'
import { BtnText, Colors, Container, ExtraText, ExtraView, FormArea, InnerContainer, Line, MsgBox, PageLogo, PageTitle, StyledButton, SubTitle, TextLink, TextLinkContent } from '../components/styles'
import { Formik } from 'formik'
import TextInput from '../components/textInput'

// import { Fontisto } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../contexts/themeContext'
import { useTranslations } from '../contexts/localizationContext'
import { useAuth } from '../contexts/authContext'
// import { Text } from 'react-native'
// import Loader from '../components/loader'
import { ActivityIndicator } from 'react-native'
// import KeyBoardWrapper from '../components/keyboardWrapper'

import SocialLogins from '../components/socialLogins'



interface LoginProps {
    navigation: any;
}


const Login = (props: LoginProps) => {
    const { t } = useTranslations();
    const { errors, setErrors, login, message, messageType, handleMessage } = useAuth()

    const { theme } = useTheme()
    let activeColors = Colors[theme.mode];

    const [ hidePassword, setHidePassword] = useState(true)

    const initialVals: any = {
        username: "",
        password: ""
    }

    return (
        <Container style={{backgroundColor: activeColors.primary}}>
            <StatusBar style={theme.mode === "dark" ? "light" : "dark"}/>
            <InnerContainer>
                {/* <PageLogo resizeMode="cover" source={require('./../assets/images/image1.jpg')} /> */}
                <PageTitle>Halal</PageTitle>
                <SubTitle style={{color: activeColors.light}}>{t('login')}</SubTitle>

                <Formik
                    initialValues={initialVals}
                    onSubmit={(values, {setSubmitting}) => {
                        // if (values.username == '' || values.password == '') {
                        //     handleMessage(t("All fields are required"))
                        //     setSubmitting(false)
                        // } else {
                            login(values, setSubmitting)
                            
                        // }
                    }}>
                        {({handleSubmit, handleChange, handleBlur, values, isSubmitting}) => 
                            <FormArea>
                                <TextInput 
                                    label={t("user_id")} 
                                    icon="person"
                                    placeholder={t("email_phone_or_username")}
                                    autoCapitalize="none"
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                    error={errors.username}
                                />

                                <TextInput 
                                    label={t("password")} 
                                    icon="lock"
                                    isPassword={true}
                                    placeholder={t("enter_password")}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    setHidePassword={setHidePassword}
                                    secureTextEntry={hidePassword}
                                    hidePassword={hidePassword}
                                    error={errors.password}
                                />

                                    {errors.non_field_errors && 
                                    <MsgBox style={{color: 'red'}}>{errors.non_field_errors[0]}</MsgBox>    
                                    }
                                                            
                                    { 
                                        isSubmitting  ?
                                        <StyledButton disabled={true}>
                                            <ActivityIndicator size="large" color={activeColors.light} /> 
                                        </StyledButton>
                                        :
                                        <StyledButton onPress={handleSubmit}>
                                            <BtnText>{t("submit")}</BtnText>
                                        </StyledButton>
                                    }
                                <Line />

                                <MsgBox style={{color: activeColors.light, marginBottom: 20}}>{t("or sign up with...")}</MsgBox>

                               

                                <SocialLogins />

                                <ExtraView>
                                    <ExtraText style={{color: activeColors.light}}>{t("dont_have_an_account")}</ExtraText>
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
    )
}

export default Login