import styled from "styled-components/native";
import Constants from 'expo-constants'


const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: "#ffff",
    secondary: "#E5E7EB",
    tertiary: "#1f2937",
    darkLight: "#9ca3af",
    brand: "#6d28d9",
    green: "#10b981",
    red: "#ef4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;


export const Container = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${primary};
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
`
export const PageLogo = styled.Image`
    width: 250px;
    height: 250px;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
`
export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`




export const FormArea = styled.View`
    width: 90%;   
`

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 12px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`

export const InputLabel = styled.Text`
    color: ${tertiary};
    /* background: red; */
    font-size: 12px;
    text-align: left;
`

export const InputIcon = styled.View`
    left: 15px;
    top: 33px;
    position: absolute;
    z-index: 1;
`

export const IconButton = styled.TouchableOpacity`
    right: 15px;
    top: 33px;
    position: absolute;
    z-index: 1;
`

export const StyledButton = styled.TouchableOpacity<{google?: boolean}>`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google && `
        background-color: ${green};
        flex-direction: row;
        justify-content: center;
    `}
`

export const BtnText = styled.Text<{google?: boolean}>`
    color: ${primary};
    font-size: 16px;   
    
    ${(props) => props.google && `
        padding: 0 25px;
    `}
`

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`
