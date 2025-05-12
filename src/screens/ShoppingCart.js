import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, { useState, useEffect, use} from 'react';
import { FlatList } from 'react-native-gesture-handler'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateCart, clearCart } from '../../store/cartSlice';
import { createOrder } from '../../store/orderSlice';
import colors from '../constants/color';
import IconButton from '../components/IconButton';
import { useIsFocused } from '@react-navigation/native';

export default function ShoppingCart({navigation}) {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.user.loggedUser);
    const userID = loggedUser?.id;
    const token = loggedUser?.token;
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();

    const order = useSelector(state => state.orderItems)

    useEffect(() => {
        const fetchCartItems = async () => {
            if (userID && token && isFocused) {
                try {
                    await dispatch(getCart({ userID, token })).unwrap(); 
                } catch (error) {
                    console.error("Failed to fetch cart items on cart page:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchCartItems();
    }, [dispatch, userID, token, isFocused]);

    const handleAddItem = async(item) => {
        let updatedCartItems;
        updatedCartItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                return {...cartItem, quantity: cartItem.quantity + 1};
            }
            return cartItem;
        })
        dispatch(updateCart({ userID, token, cartItems: updatedCartItems }));
    }
        
    const handleRemoveItem = async(item) => {
        let updatedCartItems;
        updatedCartItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                return {...cartItem, quantity: cartItem.quantity - 1};
            }
            return cartItem;
        }).filter(cartItem => cartItem.quantity > 0);
        dispatch(updateCart({ userID, token, cartItems: updatedCartItems }));
    }
    
    const handleClearCart = async() => {
        if (userID && token) {
            try {
                await dispatch(clearCart({ userID, token })).unwrap();
            } catch (error) {
                console.error("Error clearing cart:", error);
            }
        }
    }

    const handleCheckout = async(cartItems) => {
        if (userID && token) {
            try {
                await dispatch(createOrder({ userID, token, items: cartItems })).unwrap();
                dispatch(clearCart({ userID, token }));
                navigation.navigate('Orders');
            } catch (error) {
                console.error("Error during checkout:", error);
            }
        }

    }
    
    return (
        <SafeAreaView style={{flex:1}} edges={['left', 'right', 'bottom']}>
            {isLoading &&
                <View style={{position: 'absolute', top:250, left:0, right:0, bottom:0,alignContent: 'center'}}>
                    <ActivityIndicator size={'large'}/>
                </View>
            }
            {cartItems.length === 0 ? 
                (<View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'center', marginTop: 200}}>
                    <Image source={require('../../assets/images/emptyCart.png')}
                        style={{width: 40, height: 40}}/>
                    <Text style={{fontSize: 20}}>Your cart is empty!</Text>
                </View>) : 
                (<View style={styles.container}>
                    <View style={styles.topBox}> 
                        <TouchableOpacity style={styles.removeButton} onPress={() => handleClearCart()}>
                            <Text style={styles.removeText}>Remove All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 9, width: '95%'}}>
                        <FlatList
                            style={{flex: 1, width: '100%'}}
                            data = {cartItems}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({item}) => (
                            <View>
                                <View style={styles.productsInfoBox}>
                                    <View style={styles.productsImageBox}>
                                        <Image 
                                            source={{uri: item.image}}
                                            style={{width: 65, height: 65, resizeMode: 'center'}}
                                        />
                                    </View>
                                    <View style={styles.productsContentBox}>
                                        <View><Text>{item.title}</Text></View>
                                        <View style={{flexDirection: 'row', marginTop:6}}>
                                            <Text style={{fontWeight: 'bold'}}>Price: </Text><Text>${item.price}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                            <TouchableOpacity onPress = {() => handleRemoveItem(item)}>
                                                <IconButton name='remove-circle' size={22} color={colors.titleBorder}/>
                                            </TouchableOpacity>
                                            <Text style={{marginLeft:10, marginRight:10}}>Qty: {item.quantity}</Text>
                                            <TouchableOpacity onPress = {() => handleAddItem(item)}>
                                                <IconButton name='add-circle' size={22} color={colors.titleBorder}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            )}                  
                        />
                    </View>
                    <View style={styles.checkoutBox}>
                        <View style={styles.summaryBox}>
                            <View>
                                <Text style={{fontWeight: 'bold', fontSize: 18}}>Sub-Total</Text>
                                <Text>{totalItems} items</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>Total Price: </Text>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>${totalPrice}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.checkoutButton} onPress={() => handleCheckout(cartItems)}>
                            <IconButton name='bag-check' size={20} color='black'/>
                            <Text style={{fontSize: 15}}>Check Out</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'center',
    },
    topBox: {
        flex:1,
        width: '90%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    removeButton: {
        width: '25%',
        padding: 2,
    },
    removeText: {
        fontSize: 16,
        borderBottomColor: colors.contentBorder,
        borderBottomWidth: 2,
        color: colors.titleBorder,
        textAlign: 'center',
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
    },
    productsInfoBox: {
        flex: 1,
        backgroundColor: colors.contentBackground,
        flexDirection: 'row',
        margin: 10,
        padding: 10,
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
    checkoutBox: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-end',
        borderTopColor: colors.contentBorder,
        borderTopWidth: 2,
        padding: 12,
    },
    summaryBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '80%', 
        justifyContent: 'space-around'
    },
    checkoutButton: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: colors.titleBorder,
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 10,
        padding: 6,
   }

})