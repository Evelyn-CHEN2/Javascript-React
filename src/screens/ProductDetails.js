import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext} from 'react';
import ProductDetailsDisplay from '../components/ProductDetailsDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/color';
import { useDispatch } from 'react-redux';
import { add } from '../../store/cartSlice';
import { API_BASE_URL } from '../config';


export default function ProductDetails({route, navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const id = route.params.id;
    const [selectedProduct, setSelectedProduct] = useState([]);
    const dispatch = useDispatch();
    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/products`)
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json()
                console.log("Type of data: ", Array.isArray(data) ? 'Array' : typeof data);
                const selectedProduct = data.find(product => product.id === id);
                setSelectedProduct(selectedProduct);
                setIsLoading(false);
            }
            catch(e){
                console.error('Error fetching data: ', e)
            }
            finally {
                console.log('Fetch attempt finished');
            }
        }
        fetchData()
    } , [id])

    const AddToCart = () => {
        dispatch(add(selectedProduct))
        navigation.navigate('ShoppingCart')
    }
    return (
        <SafeAreaView style={{flex:1}} edges={['left', 'right', 'bottom']}> 
            <ProductDetailsDisplay
                productDetails={selectedProduct}
                addToCart={AddToCart}
                navigation={navigation}
            />
            {isLoading &&
                <View style={{position: 'absolute', top:350, left:0, right:0, buttom:0,alignContent: 'center'}}>
                    <ActivityIndicator size={'large'}/>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
})