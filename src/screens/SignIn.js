import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn } from '../../store/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserLoginInput from '../components/userLoginInput';
import IconButton from '../components/IconButton';
import colors from '../constants/color';
import { Alert } from 'react-native';
import UserProfiles from './UserProfiles';

export default function SignIn({navigation}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMasked, setIsMasked] = useState(true);

    const handleSignIn = async() => {
        let newErrors = {}
        try{
            const user = await dispatch(signIn({email, password})).unwrap();
            // Store the user in AsyncStorage if rememberMe is true
            if (rememberMe) {
                try {
                    await AsyncStorage.setItem('loggedUser', JSON.stringify(user))
                }catch (storageError) {
                    console.error('Failed to remember user:', storageError);
                }
            }
            Alert.alert('Success', 'You have logged in sucessfully!')
            navigation.navigate('UserProfiles');
        }catch (error){
            if(typeof error === 'object') {
                if (Object.hasOwn(error, 'email')) {
                    newErrors.email = error.email
                }
                if (Object.hasOwn(error, 'password')) {
                    newErrors.password = error.password  
                }
                setErrors(newErrors)
            }else{
                newErrors.wrong = error;
                setErrors(newErrors)
            }
            
        }
    }

    const handleClear = () => {
        setEmail(''),
        setPassword(''),
        setErrors({})
    }

    return (
        <SafeAreaView style={{flex:1}} edges={['left', 'right', 'top']}>
        <View style={styles.container}>
            <View style={styles.topText}>
                <Text style={{fontSize: 28}}>Login</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 10}}>Need a fake-store account?</Text>
                    <Text style={{fontSize: 11, color: colors.titleBorder}} 
                        onPress={() => navigation.navigate('SignUp')}>  Create an account</Text>
                </View>
            </View>
            <View style={styles.content}>
                <UserLoginInput text={email} setText={setEmail} placeholder='Email'/>
                {errors.email ? <Text style={{ color: 'red', fontSize:10, marginLeft:10 }}>*{errors.email}</Text> : null}
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <View style={{ flex: 8 }}>
                        <UserLoginInput text={password} setText={setPassword} placeholder='Password' secureTextEntry={isMasked}/>
                    </View>
                    <TouchableOpacity onPress={() => setIsMasked(!isMasked)} style={{ justifyContent: 'center' }}>
                        {isMasked ? <IconButton name='eye-off-outline' size={20} color='black'/> : <IconButton name='eye-outline' size={20} color='black'/>}
                    </TouchableOpacity>
                </View>
                {errors.password ? <Text style={{ color: 'red', fontSize:10, marginLeft:10 }}>*{errors.password}</Text> : null}
                {errors.wrong ? <Text style={{ color: 'red', fontSize:10, marginLeft:10 }}>*{errors.wrong}</Text> : null}
            </View>
            <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleClear()}>
                    <IconButton name={'close-circle-outline'} size={18}/>
                    <Text style={{fontSize: 16}}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={ () => setRememberMe(prev => !prev)}>
                    <View style={{
                        width: 15, height: 15, borderRadius: 3, borderWidth: 1.5,
                        borderColor: 'grey', justifyContent: 'center', alignItems: 'center',
                        marginRight: 8
                    }}>
                        {rememberMe && <Text style={{ fontSize: 10 }}>✓</Text>}
                    </View>
                    <Text style={{ fontSize: 14 }}>Remember Me</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonBox}>
                <TouchableOpacity style={[styles.button, {flexDirection:'row', alignItems: 'center'}]} 
                    onPress={() => handleSignIn()}> 
                    <IconButton name={'happy'} size={18} color={'white'}/>
                    <Text style={{color: 'white'}}>Login</Text>
                </TouchableOpacity>
            </View> 
        </View>
        <View style={styles.bottom}>
            <Text style={{color: colors.titleBorder}}>Forgot password?</Text>
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
        marginLeft: 50
    },
    content: {
        flex: 5,
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    buttonBox: {
        flex: 2,
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        justifyContent: 'center',
        backgroundColor: colors.titleBorder,
        padding: 6,
    },
    bottom: {
        flex: 4,
        alignItems: 'center',
        marginTop: 20
    }
})