import React from 'react';
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DefaultText from '../DefaultText';

const CartItem = props => {
    let TrashButton = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21) {
        TrashButton = TouchableNativeFeedback;
    }

    return (
        <View style={styles.cardItem}>
            <Text style={styles.itemData}>
                <DefaultText style={styles.quantity}>{props.quantity} </DefaultText>{' '}
                <Text style={styles.mainText}>{props.title}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainText}> ₹{props.amount.toFixed(2)}</Text>
                {props.deletable && <TrashButton onPress={props.onDelete} style={styles.deleteButton}>
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash' }
                        size={23}
                        color='red'
                    />
                </TrashButton>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        color: 'black',
        fontSize: 18
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
})
 
export default CartItem;