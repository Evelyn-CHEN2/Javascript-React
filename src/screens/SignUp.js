import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserLoginInput from '../components/userLoginInput';
import colors from '../constants/color';
import IconButton from '../components/IconButton';
import { Alert } from 'react-native';
import { API_BASE_URL } from '../config';

export default function SignUp({navigation}) {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.user.userList);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async() => {
        if (!name || !email ||!password) {
            Alert.alert('Error', 'Please fill all required fields!');
            return;
        }
        try {
            const res = await fetch('${API_BASE_URL}/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email, 
                    password
                })
            });
        const data = await res.json()

        if (res.ok) {
            Alert.alert('Success', 'Account created sucessfully!');
            navigation.navigate('UserProfiles')
        }
       else{
            Alert.alert('Error', data.erro || 'Sign up failed')
        }
        }catch (error) {
            console.error('Error signing up:', error);
            Alert.alert('Error', 'Failed to connect to server');
        }
    }
    
    const handleClear = () => {
        setName(''),
        setEmail(''),
        setPassword('')
    }

    return (
        <SafeAreaView style={{flex:1}} edges={['left', 'right', 'top']}>
        <View style={styles.container}>
            <View style={styles.topText}>
                <Text style={{fontSize: 28}}>Sign Up</Text>
            </View>
            <View style={styles.content}>
                <UserLoginInput text={name} setText={setName} placeholder='User Name'/>
                <UserLoginInput text={email} setText={setEmail} placeholder='Email'/>
                <UserLoginInput text={password} setText={setPassword} placeholder='Password'/>
                <TouchableOpacity style={{flexDirection:'row', alignItems: 'center'}} onPress={() => handleClear()}>
                    <IconButton name={'close-circle'} size={18}/>
                    <Text style={{fontSize: 16}}>Clear</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonSignUpBox}>
                <TouchableOpacity style={[styles.buttonSignUp, {flexDirection:'row', alignItems: 'center'}]} 
                    onPress={() => handleSignUp({name, email, password})}> 
                    <IconButton name={'happy'} size={18} color='white'/>
                    <Text style={{color: 'white'}}>Sign Up</Text>
                </TouchableOpacity>
            </View> 
        </View>
        <View style={styles.bottom}>
            <Text>Already have an account?</Text>
            <Text style={{color: colors.titleBorder, fontSize: 15}} onPress={() => navigation.navigate('Login')}>  Login</Text>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        borderColor: colors.contentBorder,
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 80,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    topText: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    content: {
        flex: 6,
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    buttonSignUpBox: {
        flex: 2,
        marginLeft: 20,
        marginRight: 20
    },
    buttonSignUp: {
        justifyContent: 'center',
        backgroundColor: colors.titleBorder,
        padding: 6,
    },
    bottom: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    }
})