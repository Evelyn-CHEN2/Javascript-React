import { StyleSheet, View, TextInput } from "react-native";
import React from "react";

import colors from "../constants/color";

const UserLoginInput = ({text, setText, placeholder}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style = {styles.input}
                selectionColor='grey'
                value = {text}
                placeholder = {placeholder}
                onChangeText = {setText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    input: {
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
    }
})

export default UserLoginInput;