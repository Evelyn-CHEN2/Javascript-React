import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/color';
import UserLoginInput from '../components/userLoginInput';
import { useState, useEffect } from 'react';
import IconButton from '../components/IconButton';
import { signOut } from '../../store/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupToUpdateForm from '../components/ToUpdateForm';


export default function UserProfiles({navigation}) {
    const dispatch = useDispatch()
    const loggedUser = useSelector(state=>state.user.loggedUser)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        if (loggedUser) {
            setName(loggedUser.name)
            setEmail(loggedUser.email)
        }
    }, [loggedUser])

    const handleSignOut = async() => {
        await AsyncStorage.removeItem('loggedUser'); //Remove Aysnc stored user
        dispatch(signOut()); //Clear Redux state
        navigation.replace('SignIn');
    }

    const handlerOpenPopup = () => {
        setIsPopupVisible(true);
    }

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    }

    return (
        <SafeAreaView style={{flex:1}} edges={['left', 'right', 'top']}>
            <View style={styles.container}>
                <View style={styles.welcomeBox}>
                    <Text>{loggedUser ? `Welcome, ${loggedUser.name} !` : ' '}</Text>
                </View>
                <View style={styles.topText}>
                    <Text style={{fontSize: 28}}>User Profile</Text>
                </View>
                <View style={styles.content}>
                    <View style={{marginBottom: 20}}>
                        <UserLoginInput text={name} setText={setName} placeholder={name}/>  
                    </View>
                    <View>
                    <UserLoginInput text={email} setText={setEmail} placeholder={email}/>
                    </View>
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity style={ [styles.button, { flexDirection:'row', alignItems: 'center' }] } 
                        onPress={() => handlerOpenPopup()}>
                        <IconButton name={'cloud-done'} size={18} color={'white'}/>
                        <Text style={{fontSize: 16, color: 'white'}}>Update</Text>
                        <PopupToUpdateForm
                            isVisible={isPopupVisible}
                            onCancel={handleClosePopup}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={ [styles.button, {flexDirection:'row', alignItems: 'center'}] } 
                        onPress={() => handleSignOut()}> 
                        <IconButton name={'happy'} size={18} color={'white'}/>
                        <Text style={{ fontSize: 16, color: 'white'}} >Sign Out</Text>
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
    welcomeBox: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 10
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
        flex:3,
        flexDirection: 'row',
        alignItems: 'center',
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