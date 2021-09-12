import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import DefaultText from '../../components/DefaultText';
import * as cartActions from '../../store/actions/cartAction';

const ProductDetailsScreen = props => {
    const productId = props.navigation.getParam('productId');

    const selectedProduct = useSelector(state => state.products.availableProducts.find(
        prod => prod.id === productId
    ));

    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.action}>
                <Button color={Colors.primary} title='Add to Cart' onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct))
                }} />
            </View>
            <Text style={styles.title}>₹{selectedProduct.price.toFixed(2)}</Text>
            <DefaultText style={styles.description}>{selectedProduct.description}</DefaultText>
        </ScrollView>
    );
}

ProductDetailsScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('productTitle');

    return {
        headerTitle: title
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    title: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20
    },
    action: {
        marginVertical: 10,
        alignItems: 'center'
    }
})
 
export default ProductDetailsScreen;