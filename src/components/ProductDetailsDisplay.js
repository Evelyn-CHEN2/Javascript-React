import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import IconButton from './IconButton';
import colors from '../constants/color';

const ProductDetailsDisplay = ( {productDetails, addToCart, navigation} ) => {
    const {id, image, title, rating= {}, price, description} = productDetails;
    return (
        <View style={styles.container}>
            <View style={{width: '90%', height: '100%'}}>
                <View style={styles.imageBox}>
                    <Image 
                        source={{uri: image}}
                        style={{width:250, height:250, resizeMode: 'contain'}}
                    />
                </View>
                <View style={styles.titleBox}>
                    <Text>{title}</Text>
                </View>
                <View style={styles.otherDetailsBox}>
                    <View style={styles.otherDetailsContent}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Text style={styles.otherDetailsText}>Sold: </Text>
                            <Text>{rating.count}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Text style={styles.otherDetailsText}>Price: </Text><Text style={{fontWeight: 'bold'}}>${price}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Text style={styles.otherDetailsText}>Rate: </Text><Text>{rating.rate}</Text>
                        </View>
                    </View>
                </View>
            
                <View style={styles.descriptionBox}>
                    <Text style={{fontWeight:'bold', fontSize: 20}}>Description:</Text>
                    <View style={{flex: 3, backgroundColor: 'white', borderColor: '#d2d2d2', borderWidth: 1.5}}>
                        <Text style={[styles.descriptionText, {fontSize: 16}]}>{description}</Text>
                    </View>
                </View>

                <View style={styles.iconButtonsBox}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                        <IconButton name='backspace' size={16} color='black'/>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => {addToCart(productDetails)}}>
                        <IconButton name='cart' size={16} color='black'/>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>    
       
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageBox: {
        flex: 4,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleBox: {
        flex: 0.5,
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
  
    },
    otherDetailsBox: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    otherDetailsContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#d2d2d2',
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        height: '60%',
    },
    otherDetailsText: {
        fontSize: 16,
        color: colors.titleBorder,
    },
    iconButtonsBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '100%',
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: colors.titleBorder,
        borderWidth: 2,
        borderRadius: 5,
        padding: 6,
        height: '50%',
    },
    buttonText: {
        fontFamily: 'Times New Roman',
        fontSize: 14,
        fontWeight: 'bold',
    },
    descriptionBox: {
        flex: 3.5,
        width: '100%',
    },
    descriptionText: {
        padding: 10,
    }
})

export default ProductDetailsDisplay;