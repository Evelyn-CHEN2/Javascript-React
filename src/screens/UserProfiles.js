import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import colors from '../constants/color';
import UserLoginInput from '../components/userLoginInput';
import { useState } from 'react';
import IconButton from '../components/IconButton';


export default function UserProfiles({navigation}) {
    const loggedUser = useSelector(state => state.user.loggedUser);

    const [name, setName] = useState(loggedUser.name || '');
    const [email, setEmail] = useState(loggedUser.email || '');
    return (
        <SafeAreaView style={{flex:1}} edges={['left', 'right', 'top']}>
            <View style={styles.container}>
                <View style={styles.topText}>
                    <Text style={{fontSize: 28}}>User Profile</Text>
                </View>
                <View style={styles.content}>
                    <UserLoginInput text={name} setText={setName} placeholder={loggedUser.name}/>  
                    <UserLoginInput text={email} setText={setEmail} placeholder={loggedUser.email}/>
                    
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity style={[styles.button, {flexDirection:'row', alignItems: 'center'}]} onPress={() => handleClear()}>
                        <IconButton name={'cloud-done'} size={18} color={'white'}/>
                        <Text style={{fontSize: 16, color: 'white'}}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {flexDirection:'row', alignItems: 'center'}]} onPress={() => handleLogin({email, password})}> 
                        <IconButton name={'happy'} size={18} color={'white'}/>
                        <Text style={{fontSize: 16, color: 'white'}} onPress={() => navigation.navigate('Products', {screen: 'Login'})}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text>Need more help?</Text>
                <Text style={{color: colors.titleBorder}}>  Contact us</Text>
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
        marginLeft: 50,
    },
    content: {
        flex: 4,
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    buttonBox: {
        flex:4,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    button: {
        justifyContent: 'center',
        backgroundColor: colors.titleBorder,
        padding: 6,
        borderRadius: 5
    },
    bottom: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    }
})