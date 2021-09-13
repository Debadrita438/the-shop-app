import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';


import DefaultText from '../DefaultText';
import Card from '../UI/Card';

const ProductItem = props => {
    const price = props.price.toFixed(2);

    let ProductDetails = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21) {
        ProductDetails = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <ProductDetails onPress={props.onSelect} useForeground> 
                    <View>
                        <Image style={styles.image} source={{uri: props.image}} />
                        <View style={styles.detail}>
                            <Text style={styles.title}>{props.title}</Text>
                            <DefaultText style={styles.price}>₹{price}</DefaultText>
                        </View>
                        <View style={styles.action}>
                            {props.children}
                        </View>
                    </View>
                </ProductDetails>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    product: {
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
        height: '23%',
        paddingHorizontal: 20
    }
});
 
export default ProductItem;