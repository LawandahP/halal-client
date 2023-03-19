import { useState } from 'react'
import { BtnText, Colors, Container, ExtraText, ExtraView, FormArea, InnerContainer, Line, MsgBox, PageLogo, PageTitle, StyledButton, SubTitle, TextLink, TextLinkContent } from '../components/styles'
import { Formik } from 'formik'
import TextInput from '../components/textInput'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native'
import KeyboardWrapper from '../components/keyboardWrapper'
import { useTheme } from '../contexts/themeContext'
import { useTranslations } from '../contexts/localizationContext'
import { BASE_URL } from '../config/asyncStorage';
import axios from 'axios';
import { ErrorObject } from '../constants/interface';


interface SignUpProps {
    navigation?: any
}



const SignUp = (props: SignUpProps) => {
    const { theme } = useTheme()
    let activeColors = Colors[theme.mode];

    const {t} = useTranslations()
    
    const [hidePassword, setHidePassword] = useState(true)

    const [date, setDate] = useState(new Date(2001, 3, 6));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [dob, setDob] = useState<Date>();
    
    const showDatePicker = () => {
        setDatePickerVisibility(true)
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDob(currentDate.toDateString());
        hideDatePicker();
    };

    
    const initialVals: any = {
        full_name: "",
        username: "",
        phone_number: "",
        email: "",
        // dateOfBirth: dob,
        password: ""
    }

    const [notify, setNotify] = useState<string | undefined>()
    const [messageType, setMessageType] = useState<string | undefined>()

    const [ userInfo, setUserInfo ] = useState()
    const [ errors, setErrors ] = useState<ErrorObject>({detail: {}});


    const signup = async (credentials: any, setSubmitting: (value: boolean) => void) => {
        setSubmitting(true)
        const url = `${BASE_URL}/signup/`
        await axios.post(url, credentials).then(res => {
            let userInfo = res.data.data
            setUserInfo(userInfo)

            const { message, status, user, token } = userInfo
            if (status == 'SUCCESS') {
                props.navigation.navigate("Login")
                setErrors({detail: {}})
                Alert.alert(message)
            } else {
                setSubmitting(false)
            }
        }).catch(e => {
            console.log(`error ${e}`)
            setErrors(e.response.data.detail);
            if (e.response.status === 500) {
                setNotify("Oops. Something went wrong, feel free to contact us if the problem persists")
            }
            
        })
        setSubmitting(false)
    }
    
  return (
    <KeyboardWrapper>
        <Container style={{backgroundColor: activeColors.primary}}>
            <StatusBar barStyle={theme.mode === "dark" ? "light-content" : "dark-content"} />
            <InnerContainer>
                {/* <PageLogo resizeMode="cover" source={require('./../assets/images/image1.jpg')} /> */}
                <PageTitle>Halal</PageTitle>
                <SubTitle style={{color: activeColors.light}}>{t("create_account")}</SubTitle>

                {isDatePickerVisible && (
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                )}

                <Formik
                    initialValues={initialVals}
                    onSubmit={(values, {setSubmitting}) => {
                        // if (values.username == '' || values.password == '' ) {
                        //     setNotify("password is required")
                        //     setSubmitting(false)
                        // } else {
                            signup(values, setSubmitting)
                        // }
                    }}>
                        {({handleSubmit, handleChange, handleBlur, values, isSubmitting}) => 
                            <FormArea>
                                <TextInput  
                                    label={t("full_name")} 
                                    icon="person"
                                    placeholder="John Doe"
                                    onChangeText={handleChange('full_name')}
                                    onBlur={handleBlur('full_name')}
                                    value={values.full_name}
                                    error={errors.full_name}
                                />

                                <TextInput  
                                    label={t("username")} 
                                    icon="person"
                                    autoCapitalize="none"
                                    placeholder="Jvader"
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                    error={errors.username}
                                />
                                

                                <TextInput 
                                    label={t("email")} 
                                    icon="mail"
                                    autoCapitalize="none"
                                    placeholder="johndoe@gmail.com"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType='email-address'
                                    error={errors.email}
                                />
                               

                                <TextInput 
                                    label={t("phone_number")} 
                                    icon="device-mobile"
                                    placeholder="05 890 939 238"
                                    onChangeText={handleChange('phone_number')}
                                    onBlur={handleBlur('phone_number')}
                                    value={values.phone_number}
                                    keyboardType='phone-pad'
                                    error={errors.phone_number}
                                />
                               
                            {/* <TouchableOpacity style={{flex: 1}} onPress={showDatePicker}>
                                <TextInput 
                                    label={t("date_of_birth")} 
                                    icon="calendar"
                                    placeholder="YYYY - MM - DD"
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dob}
                                    isDate={true}
                                    editable={false}
                                />
                            </TouchableOpacity> */}

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

                                {/* <TextInput 
                                    label={t("confirm_password")} 
                                    icon="key"
                                    isPassword={true}
                                    placeholder={t("confirm_password")}
                                    onChangeText={handleChange('confirm_password')}
                                    onBlur={handleBlur('confirm_password')}
                                    value={values.confirmPassword}
                                    setHidePassword={setHidePassword}
                                    secureTextEntry={hidePassword}
                                    hidePassword={hidePassword}
                                /> */}

                                <MsgBox>{notify}</MsgBox>

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

                                {/* <StyledButton google onPress={handleSubmit}>
                                    <Fontisto name="google" color={Colors.primary} size={25}/>
                                    <BtnText google>Sign Up with Google</BtnText>
                                </StyledButton> */}

                                <ExtraView>
                                    <ExtraText style={{color: activeColors.light}}>{t("have_an_account")}</ExtraText>
                                    <TextLink onPress={() => props.navigation.navigate("Login")}>
                                        <TextLinkContent> {t("login")}</TextLinkContent>
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




