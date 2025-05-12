import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserLoginInput from '../components/userLoginInput';
import colors from '../constants/color';
import IconButton from '../components/IconButton';
import { Alert } from 'react-native';

export default function SignUp({navigation}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})

    const handleSignUp = async() => {
        let newErrors = {}
        try {
            await dispatch(signUp({name, email, password})).unwrap();
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('UserProfiles')
        } catch (error) {
            if(typeof error === 'object') {
                if (Object.hasOwn(error, 'name')) {
                    newErrors.name = error.name
                }
                if (Object.hasOwn(error, 'email')) {
                    newErrors.email = error.email
                }
                if (Object.hasOwn(error, 'password')) {
                    newErrors.password = error.password  
                }
                setErrors(newErrors)
            }
        }
    }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMasked, setIsMasked] = useState(true);
    const handleClear = () => {
        setName(''),
        setEmail(''),
        setPassword(''),
        setErrors({name:'', email:'', password:''})
    }

    return (
        <SafeAreaView style={{ flex:1 }} edges={ ['left', 'right', 'top'] }>
        <View style={styles.container}>
            <View style={styles.topText}>
                <Text style={{ fontSize:28 }}>Sign Up</Text>
            </View>
            <View style={styles.content}>
                <View style={{ flex:3 }}>      
                    <UserLoginInput text={name} setText={setName} placeholder='User Name'/>
                    {errors.name ? <Text style={{ color:'red', fontSize:10, marginLeft:10 }}>*{ errors.name }</Text> : null}
                </View>
                <View style={{ flex:3 }}>
                    <UserLoginInput text={email} setText={setEmail} placeholder='Email'/>
                        {errors.email ? <Text style={{ color:'red', fontSize:10, marginLeft:10 }}>*{ errors.email }</Text> : null}
                </View>
                <View style={{ flex:4 }}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{ flex: 8 }}>
                            <UserLoginInput text={password} setText={setPassword} placeholder='Password' secureTextEntry={isMasked}/>
                        </View>
                        <TouchableOpacity onPress={() => setIsMasked(!isMasked)} style={{ justifyContent: 'center' }}>
                            {isMasked ? <IconButton name='eye-off-outline' size={20} color='black'/> : <IconButton name='eye-outline' size={20} color='black'/>}
                        </TouchableOpacity>
                    </View>
                        {errors.password ? <Text style={{ color: 'red', fontSize:10, marginLeft:10 }}>*{ errors.password }</Text> : null}   
                </View>
                    <TouchableOpacity style={{ flexDirection:'row', alignItems: 'center' }} onPress={() => handleClear()}>
                        <IconButton name={'close-circle-outline'} size={18}/>
                        <Text style={{ fontSize: 16 }}>Clear</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.buttonSignUpBox}>
                <TouchableOpacity style={[styles.buttonSignUp, {flexDirection:'row', alignItems: 'center'}]} 
                    onPress={() => handleSignUp()}> 
                    <IconButton name={'happy'} size={18} color='white'/>
                    <Text style={{color: 'white'}}>Sign Up</Text>
                </TouchableOpacity>
            </View> 
        </View>
        <View style={styles.bottom}>
            <Text>Already have an account?</Text>
            <Text style={{color: colors.titleBorder, fontSize: 15}} onPress={() => navigation.navigate('SignIn')}>  Login</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
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