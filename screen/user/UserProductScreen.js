import React from 'react';
import { Alert, Button, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/productsAction';

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', {productId: id})
    }

    const deleteHandler = id => {
        Alert.alert(
            'Are you sure?', 
            'Do you really want to delete this item?', 
            [
                {text: 'No', style: 'default'},
                {text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(productActions.deleteProduct(id))
                }}
            ]
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
 
export default UserProductScreen;