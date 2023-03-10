import React from 'react'
import { SafeAreaView , ScrollView, StyleSheet } from 'react-native'
import { Colors } from './styles';
import { StatusBar } from 'expo-status-bar';


interface MainProps {
    children: any,
    styles?: any,
}

const MainContainer = (props: MainProps) => {

    const theme = {mode: "dark"}
    let activeColors = Colors[theme.mode];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={[{
                backgroundColor: activeColors.primary
            }, props.styles]}
                showsVerticalScrollIndicator={false}
                {...props}
            >
                {props.children}
                <StatusBar 
                    style='light' 
                    backgroundColor={activeColors.brand} />
            </ScrollView>
        </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default MainContainer