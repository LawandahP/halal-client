import React, { useState } from 'react'
import { Avatar, BtnText, Container, FormArea, InnerContainer, Line, MsgBox, PageLogo, PageTitle, StyledButton, SubTitle, TextLink, TextLinkContent, WelcomeContainer, WelcomeImage } from '../components/styles'


import { StatusBar } from 'expo-status-bar'

const Welcome = () => {

    const [ hidePassword, setHidePassword] = useState(true)
    const initialVals: any = {
        email: "",
        password: ""
    }

    const handleSubmit = () => {

    }
  return (
    <Container>
        <StatusBar style="dark" />
        <InnerContainer>   
            <WelcomeImage resizeMode="cover" source={require('./../assets/images/cleaning1.jpg')} />
            <WelcomeContainer>
                <PageTitle welcome={true}>Welcome Back Githaiga!</PageTitle>
                
                <FormArea>
                    <Avatar resizeMode="cover" source={require('./../assets/images/image1.jpg')} />
                    <Line />
                    <StyledButton onPress={handleSubmit}>
                        <BtnText>Logout</BtnText>
                    </StyledButton>
                </FormArea>    
            </WelcomeContainer>
        </InnerContainer>
    </Container>
  )
}

export default Welcome