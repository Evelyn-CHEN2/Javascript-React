import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect} from 'react';
import { FlatList, Pressable } from 'react-native-gesture-handler'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import IconButton from '../components/IconButton';
import colors from '../constants/color';
import { API_BASE_URL } from '../config';

export default function ProductsList( {route, navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const category = route.params.category.toLowerCase();
    const [products, setProducts] = useState([]);
    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/products`)
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json()
                console.log("Type of data: ", Array.isArray(data) ? 'Array' : typeof data);
                const categoryProducts = data.filter(product => product.category === category);
                setProducts(categoryProducts);
                setIsLoading(false);
            }
            catch(e){
                console.error('Error fetching data: ', e)
            }
            finally {
                console.log('Fetch attempt finished');
            }
        } 
        fetchData();
    } , [category])

    const handleProduct = (id) => {
        setSelectedProduct(id);
        navigation.navigate('Product Details', {id})
    }

    return (
        <SafeAreaView style={{flex:1}} edges={['left', 'right']}>
            {isLoading &&
                <View style={{position: 'absolute', top:250, left:0, right:0, buttom:0,alignContent: 'center'}}>
                    <ActivityIndicator size={'large'}/>
                </View>
            }
            <View style={styles.container}>
                <View style={{flex: 9,width: '95%',alignItems: 'center'}}>
                    <FlatList
                        style={{flex: 1, width: '100%'}}
                        data = {products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.productsListBox} onPress={() => handleProduct(item.id)}>
                                <View style={styles.productsImageBox}>
                                <Image 
                                    source={{uri: item.image}}
                                    style={{width: 65, height: 65, resizeMode: 'center'}}
                                />
                                </View>
                                <View style={styles.productsContentBox}>
                                    <View style={{flex:3, justifyContent: 'flex-start'}}><Text style={selectedProduct === item.id && {color: '#f3722c'}}>{item.title}</Text></View>
                                    <View style={{flex:2, justifyContent: 'flex-end'}}><Text style={{fontWeight: 'bold'}}>Price: ${item.price}</Text></View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.bottomBox}>
                    <Pressable style={({pressed}) => [styles.iconButton, pressed && {opacity: 0.5}]} onPress={() => navigation.goBack()}>
                        <IconButton name='backspace' size={20} color='black'/>
                        <Text style={styles.buttonText}>Back</Text>
                    </Pressable>
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
    productsListBox: {
        flex: 1,
        backgroundColor: colors.contentBackground,
        flexDirection: 'row',
        margin: 10,
        padding: 15,
        borderColor: colors.contentBorder,
        borderWidth: 2,
        borderRadius: 5,
    },
    productsImageBox: {
        flex: 2,
        marginRight: 10,
    },
    productsContentBox: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    bottomBox: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iconButton: {
        width: '99%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: colors.contentBorder,
        borderTopWidth: 2,
        padding: 12,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.5
    }
})