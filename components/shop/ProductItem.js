import React from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import Colors from '../../constants/Colors';
import DefaultText from '../DefaultText';

const ProductItem = props => {
    const price = props.price.toFixed(2);

    let ProductDetails = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21) {
        ProductDetails = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <ProductDetails onPress={props.onViewDetail} useForeground> 
                    <View>
                        <Image style={styles.image} source={{uri: props.image}} />
                        <View style={styles.detail}>
                            <Text style={styles.title}>{props.title}</Text>
                            <DefaultText style={styles.price}>₹{price}</DefaultText>
                        </View>
                        <View style={styles.action}>
                            <Button color={Colors.primary} title='View Details' onPress={props.onViewDetail} />
                            <Button color={Colors.primary} title='To Cart' onPress={props.onAddToCart} />
                        </View>
                    </View>
                </ProductDetails>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    detail: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
});
 
export default ProductItem;