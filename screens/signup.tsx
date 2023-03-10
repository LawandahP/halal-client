import React, { FC, useState } from 'react'
import { BtnText, Colors, Container, ExtraText, ExtraView, FormArea, InnerContainer, Line, MsgBox, PageLogo, PageTitle, StyledButton, SubTitle, TextLink, TextLinkContent } from '../components/styles'
import { Formik } from 'formik'
import TextInput from '../components/textInput'
import { StatusBar } from 'expo-status-bar'

import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native'
import KeyboardWrapper from '../components/keyboardWrapper'


interface SignUpProps {
    navigation?: any
}

const SignUp = (props: SignUpProps) => {
    let activeColors = Colors
    const [ hidePassword, setHidePassword] = useState(true)

    const [date, setDate] = useState(new Date(2001, 3, 6));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //dob
    const [dob, setDob] = useState<Date>()

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    };
    
    // const showMode = (currentMode: any) => {
    //     if (Platform.OS === 'android') {
    //         setShow(false);
    //         // for iOS, add a button that closes the picker
    //     }
    //     setMode(currentMode);
    // };
    
    const showDatepicker = () => {
        // showMode('date');
        setShow(true)
    };
    const initialVals: any = {
        fullName: "",
        phone_number: "",
        email: "",
        dateOfBirth: "",
        password: ""
    }

    const handleSubmit = () => {

    }
  return (
    <KeyboardWrapper>

    
    <Container>
        <StatusBar style="dark" />
        <InnerContainer>
            {/* <PageLogo resizeMode="cover" source={require('./../assets/images/image1.jpg')} /> */}
            <PageTitle>Halal</PageTitle>
            <SubTitle>Create Account</SubTitle>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    display="default"
                    is24Hour={true}
                    onChange={onChange}
                />
            )}

            <Formik
                initialValues={initialVals}
                onSubmit={(values) => {
                    console.log(values)
                }}>
                    {({handleChange, handleBlur, values}) => 
                        <FormArea>
                            <TextInput  
                                label="Full Name" 
                                icon="person"
                                placeholder="John Doe"
                                placeHolderTextColor={activeColors.darkLight}
                                onChangeText={handleChange('fullNAme')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />

                            <TextInput 
                                label="Email Address" 
                                icon="mail"
                                placeholder="johndoe@gmail.com"
                                placeHolderTextColor={activeColors.darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType='email-address'
                            />

                            <TextInput 
                                label="Phone Number" 
                                icon="device-mobile"
                                placeholder="05 890 939 238"
                                placeHolderTextColor={activeColors.darkLight}
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                                value={values.phoneNumber}
                                keyboardType='numeric'
                            />

                            <TextInput 
                                label="Date of Birth" 
                                icon="calendar"
                                placeholder="YYYY - MM - DD"
                                placeHolderTextColor={activeColors.darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={dob ? dob.toDateString() : ''}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatepicker}
                            />

                            <TextInput 
                                label="Password" 
                                icon="lock"
                                isPassword={true}
                                placeholder="Enter password"
                                placeHolderTextColor={activeColors.darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                setHidePassword={setHidePassword}
                                secureTextEntry={hidePassword}
                                hidePassword={hidePassword}
                            />

                            <TextInput 
                                label="Confirm Password" 
                                icon="key"
                                isPassword={true}
                                placeholder="Confirm password"
                                placeHolderTextColor={activeColors.darkLight}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                setHidePassword={setHidePassword}
                                secureTextEntry={hidePassword}
                                hidePassword={hidePassword}
                            />

                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <BtnText>Submit</BtnText>
                            </StyledButton>

                            <Line />

                            {/* <StyledButton google onPress={handleSubmit}>
                                <Fontisto name="google" color={Colors.primary} size={25}/>
                                <BtnText google>Sign Up with Google</BtnText>
                            </StyledButton> */}

                            <ExtraView>
                                <ExtraText>Have an account?</ExtraText>
                                <TextLink onPress={() => props.navigation.navigate("Login")}>
                                    <TextLinkContent> Login</TextLinkContent>
                                </TextLink>
                            </ExtraView>

                        </FormArea>
                    }
            </Formik>
            <FormArea>

            </FormArea>
        </InnerContainer>
    </Container>
    </KeyboardWrapper>
  )
}

export default SignUp