import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoggedUser } from '../../store/userSlice';

export default function SplashScreen( {navigation} ) {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadResources = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                console.log('Status Code:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            }
            catch(error) {
                console.error('Error fetching data: ', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        loadResources();
    }, []);

    useEffect (() => {
        const restoreUser = async () => {
            try{
                const remembered = await AsyncStorage.getItem('loggedUser')
                if (remembered) {
                    const user = JSON.parse(remembered);
                    dispatch(setLoggedUser(user));
                    navigation.replace('MainTabs', {
                        screen: 'Profile Tab',
                        params: {
                            screen: 'UserProfiles',
                        }
                    });
                }else{
                    setTimeout(() => {
                        navigation.replace('MainTabs', {
                            screen: 'Profile Tab',
                            params: {
                                screen: 'SignUp',
                            }
                        })
                    }, 1000)     
                }
            }finally{
                setIsLoading(false)
            }
        }
        restoreUser();
      }, [])

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.imageBox}>
                    <Image source={require('../../assets/images/splashLogo.jpeg')}
                        style={{width: 200, height: 200, resize: 'cover', alignSelf: 'center', marginBottom: 20 }}/>
                    {isLoading ? (
                    <ActivityIndicator size='large'/>) : null}
                </View>
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageBox: {
        flex: 4,
        justifyContent: 'center',
    },
    logoBox: {
        flex: 6,
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-around',
        
    },
    shadowText: {
        fontSize: 50,
        fontFamily: 'cursive',
        color: 'red',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10,
    },
})