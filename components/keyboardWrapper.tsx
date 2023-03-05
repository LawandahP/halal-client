import React from 'react'
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'

interface KeyboardProps {
    children: any;
}

const KeyBoardWrapper = (props: KeyboardProps) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {props.children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default KeyBoardWrapper