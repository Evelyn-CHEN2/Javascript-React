import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from '../../store/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserLoginInput from '../components/userLoginInput';
import IconButton from '../components/IconButton';
import colors from '../constants/color';
import { Alert } from 'react-native';

export default function Login({navigation}) {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.user.userList);

    const handleLogin = (logingUser) => {
        const trimmedEmail = logingUser.email.trim().toLowerCase();
        const matchingUser = userList.find(user => 
            user.id === trimmedEmail &&
             user.password === logingUser.password)
        if (!matchingUser) {
            Alert.alert(
                "You don't have an account yet",
                'Do you want to register now?',
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'OK', onPress: () => navigation.navigate('SignUp')}
                ]
            );
        }else{
            dispatch(logIn({email: trimmedEmail, password: logingUser.password}))
            navigation.navigate('UserProfiles');
        }
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                <UserLoginInput text={password} setText={setPassword} placeholder='Password'/>
                <TouchableOpacity style={{flexDirection:'row', alignItems: 'center'}} onPress={() => handleClear()}>
                    <IconButton name={'close-circle'} size={18}/>
                    <Text style={{fontSize: 16}}>Clear</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonBox}>
                <TouchableOpacity style={[styles.button, {flexDirection:'row', alignItems: 'center'}]} 
                    onPress={() => handleLogin({email, password})}> 
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
        flex: 6,
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