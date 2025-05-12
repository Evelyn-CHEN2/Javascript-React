import { StyleSheet, View, TextInput } from "react-native";
import React from "react";

const UserLoginInput = ({text, setText, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style = {styles.input}
                selectionColor='grey'
                value = {text}
                placeholder = {placeholder}
                onChangeText = {setText}
                secureTextEntry = {secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center'
    },
    input: {
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
    }
})

export default UserLoginInput;