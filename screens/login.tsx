import React, { FC, useState } from 'react'
import { BtnText, Colors, Container, ExtraText, ExtraView, FormArea, InnerContainer, Line, MsgBox, PageLogo, PageTitle, StyledButton, SubTitle, TextLink, TextLinkContent } from '../components/styles'
import { Formik } from 'formik'
import TextInput from '../components/textInput'

import { Fontisto } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
// import KeyBoardWrapper from '../components/keyboardWrapper'


interface LoginProps {
    navigation?: any
}


const Login = (props: LoginProps) => {

    const [ hidePassword, setHidePassword] = useState(true)
    const initialVals: any = {
        email: "",
        password: ""
    }

    const handleSubmit = () => {

    }
  return (

    // <KeyBoardWrapper>
        <Container>
            <StatusBar style="dark" />
            <InnerContainer>
                {/* <PageLogo resizeMode="cover" source={require('./../assets/images/image1.jpg')} /> */}
                <PageTitle>Halal</PageTitle>
                <SubTitle>Login</SubTitle>

                <Formik
                    initialValues={initialVals}
                    onSubmit={(values) => {
                        console.log(values)
                        props.navigation.navigate("Welcome")
                    }}>
                        {({handleChange, handleBlur, values}) => 
                            <FormArea>
                                <TextInput 
                                    label="Email" 
                                    icon="mail"
                                    placeholder="johndoe@gmail.com"
                                    placeHolderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType='email-address'
                                />

                                <TextInput 
                                    label="Password" 
                                    icon="lock"
                                    isPassword={true}
                                    placeholder="Enter password"
                                    placeHolderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    setHidePassword={setHidePassword}
                                    secureTextEntry={hidePassword}
                                    hidePassword={hidePassword}
                                />

                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <BtnText>Submit</BtnText>
                                </StyledButton>

                                <Line />

                                <StyledButton google onPress={handleSubmit}>
                                    <Fontisto name="google" color={Colors.primary} size={25}/>
                                    <BtnText google>Sign in with Google</BtnText>
                                </StyledButton>

                                <ExtraView>
                                    <ExtraText>Don't have an account?</ExtraText>
                                    <TextLink onPress={() => props.navigation.navigate("SignUp")}>
                                        <TextLinkContent> Sign Up</TextLinkContent>
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