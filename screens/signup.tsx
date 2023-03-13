import React, { useContext, useState } from 'react'
import { BtnText, Colors, Container, ExtraText, ExtraView, FormArea, InnerContainer, Line, MsgBox, PageLogo, PageTitle, StyledButton, SubTitle, TextLink, TextLinkContent } from '../components/styles'
import { Formik } from 'formik'
import TextInput from '../components/textInput'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StatusBar, TouchableOpacity } from 'react-native'
import KeyboardWrapper from '../components/keyboardWrapper'
import { ThemeContext, ThemeContextValue } from '../contexts/themeContext'
import { useTranslations } from '../contexts/localizationContext'


interface SignUpProps {
    navigation?: any
}

const SignUp = (props: SignUpProps) => {
    const { theme } = useContext<ThemeContextValue>(ThemeContext)
    let activeColors = Colors[theme.mode];

    const {t} = useTranslations()
    
    const [ hidePassword, setHidePassword] = useState(true)

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
                    onSubmit={(values) => {
                        console.log(values)
                    }}>
                        {({handleChange, handleBlur, values}) => 
                            <FormArea>
                                <TextInput  
                                    label={t("full_name")} 
                                    icon="person"
                                    placeholder="John Doe"
                                    placeHolderTextColor={activeColors.light}
                                    onChangeText={handleChange('fullNAme')}
                                    onBlur={handleBlur('fullName')}
                                    value={values.fullName}
                                    keyboardType='text'
                                />

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
                                    label={t("phone_number")} 
                                    icon="device-mobile"
                                    placeholder="05 890 939 238"
                                    placeHolderTextColor={activeColors.darkLight}
                                    onChangeText={handleChange('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                    value={values.phoneNumber}
                                    keyboardType='phone-pad'
                                />
                            <TouchableOpacity style={{flex: 1}} onPress={showDatePicker}>
                                <TextInput 
                                    label={t("date_of_birth")} 
                                    icon="calendar"
                                    placeholder="YYYY - MM - DD"
                                    placeHolderTextColor={activeColors.darkLight}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dob}
                                    isDate={true}
                                    editable={false}
                                />
                            </TouchableOpacity>

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

                                <TextInput 
                                    label={t("confirm_password")} 
                                    icon="key"
                                    isPassword={true}
                                    placeholder={t("confirm_password")}
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
                                    <BtnText>{t("submit")}</BtnText>
                                </StyledButton>

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