import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from "react-native";
import IconButton from "./IconButton";
import UserLoginInput from "./userLoginInput";
import colors from "../constants/color";
import { update } from '../../store/userSlice';
import { set } from "lodash";


const PopupToUpdateForm = ({ isVisible, onCancel }) => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state=>state.user.loggedUser)
    const [changedName, setChangedName] = useState('');
    const [changedPassword, setChangedPassword] = useState('');
    const [errors, setErrors] = useState({}) //{name: '', password: '', server: ''}
    const [isMasked, setIsMasked] = useState(true);

    const handleConfirm = async() => {
        let newErrors = {}
        try {
            await dispatch(update({userID: loggedUser.id, name: changedName, password: changedPassword})).unwrap();
            Alert.alert('Success', 'Account updated successfully!');
            setChangedName('');
            setChangedPassword('');
            onCancel();   
        }catch (error) {
            if (error.toLowerCase().includes('name')) {
                newErrors.name = error;
            } else if (error.toLowerCase().includes('password')) {
                newErrors.password = error;
            } else {
                newErrors.wrong = error;
            }
            setErrors(newErrors);
        }
    }

    return (
        <Modal 
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}>
            
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.cancelBox}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <IconButton name='close' size={20} color='black'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.input}>
                        <UserLoginInput
                            text={changedName}
                            setText={setChangedName}
                            placeholder='New name'
                        />
                        {errors.name ? <Text style={{ color: 'red', fontSize:10, marginLeft:10 }}>*{ errors.name }</Text> : null}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 8 }}>
                                <UserLoginInput
                                    text={changedPassword}
                                    setText={setChangedPassword}
                                    placeholder='New password'
                                    secureTextEntry={isMasked}
                                />
                            </View>
                            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                                <TouchableOpacity onPress = {() => setIsMasked(!isMasked)}>
                                    {isMasked ? <IconButton name='eye-off-outline' size={20} color={'black'}/> : <IconButton name='eye-outline' size={20} color={'black'}/>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {errors.password ? <Text style={{ color: 'red', fontSize:10, marginLeft:10 }}>*{ errors.password }</Text> : null}
                        {errors.wrong ? <Text style={{ color: 'red', fontSize:10, marginLeft:10 }}>*{ errors.wrong }</Text> : null}
                    </View> 
                    <View style={styles.confirmButtonBox}> 
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={{color: 'white'}}>Confirm</Text>
                    </TouchableOpacity>    
                    </View>  
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '"rgba(0, 0, 0, 0.5)"',
    },
    modalContent: {
        width: '80%',
        height: '40%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelBox: {
        flex: 2,
        width: '100%',
        alignItems: 'flex-end'
    },
    cancelButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    input: {
        flex:4,
        width: '100%',
        justifyContent: 'space-around',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    confirmButtonBox: {
        flex: 4, 
        width: '25%',
        alignItems: 'center'
    },
    confirmButton: {
        backgroundColor: colors.titleBorder,
        padding: 6,
        justifyContent: 'center',
        borderRadius: 5,
    },
  });

  export default PopupToUpdateForm;