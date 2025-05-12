import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect} from 'react';
import { FlatList } from 'react-native-gesture-handler'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../config';
import colors from '../constants/color';


export default function Categories( {navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const _ = require('lodash');
    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await fetch( `${API_BASE_URL}/products`)
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                //Data is feteched products array
                const data = await res.json()
                console.log("Type of data: ", Array.isArray(data) ? 'Array' : typeof data);
                const uniqueCategories = _.uniq(data.map(product => product.category));
                const captitalCategories = uniqueCategories.map(
                    category => {
                        // const captitalCategory = category.split(' ').map((string => {
                        //     return _.capitalize(string);
                        // })).join(' ');
                        const captitalCategory = category.replace(/(^|\s)\w/g, (letter) =>letter.toUpperCase());
                        return captitalCategory;
                    }
                )
                setCategories(captitalCategories);
                setIsLoading(false);
            }
            catch(e){
                console.error('Error fetching categories data: ', e)
            }
            finally {
                console.log('Fetch attempt finished');
            }
        }
        fetchData()
    } , [])

    const handleCategory = (category) => {
        setSelectedCategory(category);
        navigation.navigate('Products List', {category})
    }
    
    return (
        <SafeAreaView style={{flex:1}} edges={['left', 'right', 'bottom']}>
            <View style={styles.container}>
                {isLoading &&
                    <View style={{position: 'absolute', top:250, left:0, right:0, buttom:0,alignContent: 'center'}}>
                        <ActivityIndicator size={'large'}/>
                    </View>
                }
                <View style={{width: '95%'}}>
                    <FlatList
                        data = {categories}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.categoryBox} onPress={() => handleCategory(item)}>
                                <Text style={[styles.categoryFont, selectedCategory === item && {color: colors.selectedColor}]}>{item}</Text>
                            </TouchableOpacity>   
                        )}                  
                    />
                </View> 
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Times New Roman',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: colors.background,
        padding: 12,
        borderColor: colors.titleBorder,
        borderWidth: 2,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
    },
    categoryBox: {
        backgroundColor: colors.contentBackground,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        borderColor: colors.contentBorder,
        borderWidth: 2,
    },
    categoryFont: {
        fontSize: 15,
    },
})