import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, Platform, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/productsAction';

const UserProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', {productId: id})
    }

    const deleteProductHandler = async (id) => {
        setIsLoading(true)
        try {
            await dispatch(productActions.deleteProduct(id))
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    const deleteHandler = useCallback((id) => {
        setError(null);
        setIsLoading(true);
        Alert.alert(
            'Are you sure?', 
            'Do you really want to delete this item?', 
            [
                {text: 'No', style: 'default'},
                {text: 'Yes', style: 'destructive', onPress: () => deleteProductHandler(id)}
            ]
        )
        
    }, [dispatch]);

    useEffect(() => {
        if(error) {
            Alert.alert('An error occured!', error, [
                {text: 'Okay'}
            ])
        }
    }, [error]);

    if(isLoading) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <FlatList 
            data={userProducts}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <Button 
                        color={Colors.primary} 
                        title='Edit Details' 
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }} 
                    />
                    <Button 
                        color={Colors.primary} 
                        title='Delete Item' 
                        onPress={() => deleteHandler(itemData.item.id)} 
                    />
                </ProductItem>
            )}
        />
    );
}

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Menu'
                    iconName={
                        Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
                    }
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>   
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Add'
                    iconName={
                        Platform.OS === 'android' ? 'md-create' : 'ios-create'
                    }
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons> 
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
 
export default UserProductScreen;