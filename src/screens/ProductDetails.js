import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import ProductDetailsDisplay from '../components/ProductDetailsDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { add, updateCart, getCart } from '../../store/cartSlice';
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
                console.error('Error fetching product details data: ', e)
            }
            finally {
                console.log('Fetch attempt finished');
            }
        }
        fetchData()
    } , [id])

    const cartItems = useSelector((state) => state.cart.cartItems);
    const loggedUser = useSelector(state => state.user.loggedUser);
    const userID = loggedUser?.id;
    const token = loggedUser?.token;

    const AddToCart = async() => {
        const existedItem = cartItems.find(cartItem => cartItem.id === selectedProduct.id);
        let updatedCartItems;
        if (existedItem) {
            updatedCartItems = cartItems.map(item => 
                item.id === selectedProduct.id ? {...item, quantity: item.quantity + 1} : item
            )
        }else{
            updatedCartItems = [...cartItems, {...selectedProduct, quantity: 1}];
        }
        if (userID && token) {
            try {
                await dispatch(updateCart({ userID, token, cartItems: updatedCartItems })).unwrap();
            } catch (error) {
                console.error("Error updating cart on server:", error);
            }
        }
        navigation.navigate('ShoppingCart');
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