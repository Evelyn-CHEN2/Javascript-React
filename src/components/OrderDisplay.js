import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import colors from '../constants/color';
import { cancelOrder } from '../../store/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

const OrderDisplay = ({ orders }) => {
    const dispatch = useDispatch()
    const loggedUser = useSelector(state => state.user.loggedUser);
    const token = loggedUser?.token;
    return (
        <FlatList
            data={orders}
            keyExtractor={(order) => order.id.toString()}
            renderItem={({ item: order }) =>{
                const items = JSON.parse(order.order_items);
                return (
                    <View style={{ borderBottomColor: 'black', borderBottomWidth:0.8}}>
                        <View style={ styles.orderInfo }>
                            <Text style={{ fontWeight:'bold'}}>Order No: # {order.id}</Text>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={{ marginLeft:10, fontWeight:'bold'}}>Total: </Text>
                                <Text>${order.total_price}</Text>
                            </View>
                        </View>
                        <FlatList
                            data={items}
                            nestedScrollEnabled
                            keyExtractor={(_, i) => i.toString()}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', padding:10, marginBottom:25, backgroundColor: 'white'}}>
                                    <Image 
                                        source={{uri: item.image}}
                                        style={{width:65, height:65, resizeMode: 'contain'}}
                                    />
                                    <View style={{ width: '80%', flexDirection: 'column', justifyContent: 'space-around', marginLeft: 10}}>
                                        <Text>{item.title}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
                                            <Text>Qty: {item.quantity}</Text>
                                            <Text>Price: ${item.price.toFixed(2)}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                        <View style={ styles.OrderExcuteBox }>
                            <Text style={{ color: colors.titleBorder,
                                        fontSize: 16,
                                        fontFamily: 'Times New Roman',
                                        fontWeight: 'bold', }}>Pay Now</Text>
                            <TouchableOpacity onPress={() => dispatch(cancelOrder({ orderID: order.id, token }))}>
                                <Text style={{ color: colors.titleBorder }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )

            }}
        />
    )
}

const styles = StyleSheet.create({
    orderInfo: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        padding:10
    },
    OrderExcuteBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    }
})

export default OrderDisplay;