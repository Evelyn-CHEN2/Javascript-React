import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../store/orderSlice';
import IconButton from '../components/IconButton';
import colors from '../constants/color';
import { useIsFocused } from '@react-navigation/native';  
import OrderDisplay from '../components/OrderDisplay';

export default function Orders({ route }) {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.user.loggedUser);
    const userID = loggedUser?.id;
    const token = loggedUser?.token;
    const orders = useSelector(state => state.order.orderItems);
    const [isLoading, setIsLoading] = useState(true);
    const [showNewOrders, setShowNewOrders] = useState(true);
    const [showPaidOrders, setShowPaidOrders] = useState(false);
    const [showDeliveredOrders, setShowDeliveredOrders] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchOrders = async () => {
            if (userID && token && isFocused) {
                try {
                    await dispatch(getOrder({ userID, token })).unwrap();
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchOrders();
    }, [userID, token, dispatch, isFocused]);

    return (
        <SafeAreaView style={{flex:1, alignItems:'center'}} edges={['left', 'right', 'bottom']}> 
           <Text>Hi, {loggedUser?.name}</Text>
            <View style={styles.newOrderBox}>
                <Text style={{ fontSize:10 }}>ORDER STATUS:</Text>
                <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                    <Text style={{ fontWeight:'bold', fontSize:15}}>New Orders</Text>
                    <TouchableOpacity onPress={() => setShowNewOrders(!showNewOrders)}>
                        <IconButton name={ showNewOrders ? 'caret-up-outline' : 'caret-down-outline' } size={22} color={colors.titleBorder}/>
                    </TouchableOpacity>
                </View>
                {showNewOrders && (
                    <View style={{ backgroundColor: colors.orderBackground, padding: 10, marginTop: 10 }}>
                        <OrderDisplay orders={orders}/>
                    </View>
                )}
                
            </View>
            <View style={styles.paidOrderBox}>
                <Text style={{ fontSize:10 }}>ORDER STATUS:</Text>
                <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                    <Text style={{ fontWeight:'bold', fontSize:15}}>Paid Orders</Text>
                    <TouchableOpacity onPress = {() => setShowPaidOrders(!showPaidOrders)}>
                        <IconButton name={ showPaidOrders ? 'caret-up-outline' : 'caret-down-outline' } size={22} color={colors.titleBorder}/>
                    </TouchableOpacity>
                </View>
                {showPaidOrders && (
                    <View style={{ backgroundColor: colors.orderBackground, padding: 10, marginTop: 10 }}>
                        <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                            <Text>Order No: #</Text>
                            <Text style={{ marginLeft:10 }}>Total: $</Text>
                        </View>
                            <Text style={ styles.OrderModifyText }>Receive</Text>
                    </View>
                )}
            </View>
            <View style={styles.deliveredOrderBox}>
                <Text style={{ fontSize:10 }}>ORDER STATUS:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight:'bold', fontSize:15}}>Delivered Orders</Text>
                    <TouchableOpacity onPress = {() => setShowDeliveredOrders(!showDeliveredOrders)}>
                        <IconButton name={ showDeliveredOrders ? 'caret-up-outline' : 'caret-down-outline' } size={22} color={colors.titleBorder}/>
                    </TouchableOpacity>
                </View>
                {showDeliveredOrders && (
                    <View style={{ backgroundColor: colors.orderBackground, padding: 10, marginTop: 10 }}>
                        <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                            <Text>Order No: #</Text>
                            <Text style={{ marginLeft:10 }}>Total: $</Text>
                        </View>
                        <Text>Order Again</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    newOrderBox: {
        width: '90%',
        padding: 10, 
        backgroundColor: 'white',
        marginTop: 15,
    },
    itemDetailsBox: {
    },
    paidOrderBox: {
   
        width: '90%',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 15,
    },
    deliveredOrderBox: {
        flex: 4,
        width: '90%',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 15,
    },
    
})