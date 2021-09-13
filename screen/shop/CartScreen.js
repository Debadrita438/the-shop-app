import React, { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cartAction';
import * as ordersActions from '../../store/actions/orderAction';

import Colors from '../../constants/Colors';

const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false);

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for(const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum 
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={
                    itemData => (
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.productPrice}
                            deletable
                            onDelete={() => {
                                dispatch(cartActions.removeFromCart(itemData.item.productId))
                            }}
                        />
                    )
                }
            />

            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>₹{cartTotalAmount.toFixed(2)}</Text>
                </Text>
                {
                    isLoading 
                    ? <ActivityIndicator 
                        size='small' 
                        color={Colors.primary} 
                    />
                    : <Button 
                        color={Colors.accent} 
                        title='Place Order' 
                        disabled={cartItems.length === 0} 
                        onPress={sendOrderHandler}
                    />
                }

            </View>
        </View>
    );
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    },
    amount: {
        color: Colors.primary
    }
})
 
export default CartScreen;