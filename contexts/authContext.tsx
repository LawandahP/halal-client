import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { BASE_URL, getData, storedData } from "../config/asyncStorage";
import axios from "axios";
import { ErrorObject, UserInfoInterface } from "../constants/interface";


type AuthContextType = {
    userInfo: UserInfoInterface
    setUserInfo: () => void
    errors: string | undefined
    setErrors: () => void
    message: string | undefined
    setMessage: () => void
    messageType: string | undefined
    setMessageType: () => void
    isLoading: boolean;
    setIsLoading?: (value: boolean) => void;
    userToken: string | null,
    setUseToken?: () => void,
    login: (value: any) => void,
    logout: () => void,
    handleMessage: (value: any) => void,
    getUserInfo: () => void
};
export const AuthContext = createContext<AuthContextType>({
    userInfo: {
        id: 1,
        full_name: "",
        username: "",
        email: "",
        phone_number: ""
    },
    setUserInfo: () => {},
    errors: undefined,
    setErrors: () => {},
    message: undefined,
    setMessage: () => {},
    messageType: undefined,
    setMessageType: () => {},
    isLoading: false,
    setIsLoading: () => {},
    userToken: null,
    setUseToken: () => {},
    login: () => {},
    logout: () => {},
    handleMessage: () => {},
    getUserInfo: () => {}
});


interface AuthProps {
    children: any
}
export const AuthProvider = (props:AuthProps) => {
    const [ errors, setErrors ] = useState<ErrorObject>({detail: {}});
    
    const [message, setMessage] = useState<string | undefined>()
    const [messageType, setMessageType] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState<string | null>(null as string | null);


    const handleMessage = (message: string, type = 'FAILED') => {
        setMessage(message)
        setMessageType(type)
    }

    const [ userInfo, setUserInfo] = useState<UserInfoInterface>()

    const getUserInfo = async () => {
        try {
          const userInfo = await getData("userInfo")
          if (userInfo) {
            setUserInfo(userInfo)
          }
        } catch(e: any) {
          Alert.alert(`User not authenticated ${e}`)
        }
    }

   
    
    const login = async (credentials: any, setSubmitting: (value: boolean) => void) => {
        handleMessage("")
        setIsLoading(true)
        const url = `${BASE_URL}/login/`
        await axios.post(url, credentials).then(res => {
            let userInfo = res.data.data
            setUserInfo(userInfo)
            storedData('userInfo', userInfo.user)

            const { message, status, user, token } = userInfo

            setUserToken(token)
            storedData('userToken', userToken);
            if (status == 'SUCCESS') {
                // handleMessage(message, status)
                setErrors({detail: {}})
            } 
            setSubmitting(false)
            console.log(res.data)
        }).catch(e => {
            console.log(`error ${e}`)
            setErrors(e.response.data.detail)
            setSubmitting(false)
            setIsLoading(false);

            if (e.response.status === 500) {
                handleMessage("An error occurred. Check your network and try again")
            }
            
        })
        
        
       
    }


    const logout = () => {
        setUserToken(null)
        setIsLoading(true)
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await getData('userToken')
            setUserToken(userToken)
            setIsLoading(false)
        } catch(e) {
            Alert.alert(`Error lil bitch ${e}`)
        }
        
    }
    

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider 
            value={
                {
                    getUserInfo, userInfo, setUserInfo, errors, setErrors, login, logout, 
                    isLoading, userToken,
                    handleMessage, message, setMessage,
                    messageType, setMessageType
                }
            }>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
