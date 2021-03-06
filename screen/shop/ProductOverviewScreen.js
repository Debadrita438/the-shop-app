import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, Platform, ActivityIndicator, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector,useDispatch } from 'react-redux';
import DefaultText from '../../components/DefaultText';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cartAction';
import * as productActions from '../../store/actions/productsAction';

const ProductOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products =  useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async() => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts())
        } catch(err) {
            setError(err.message)
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => setIsLoading(false));
    }, [dispatch]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { 
            productId: id,
            productTitle: title
        })
    }

    if(error) {
        return(
            <View style={styles.centered}>
                <DefaultText>An error occured!</DefaultText>
                <Button 
                    title='Try Agian' 
                    onPress={loadProducts} 
                    color={Colors.accent} 
                />
            </View>
        )
    }

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if(!isLoading && products.length === 0) {
        return(
            <View style={styles.centered}>
                <DefaultText>No Products found! Maybe start adding some?</DefaultText>
            </View>
        )
    }

    return (
        <FlatList 
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={
                itemData=> (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => 
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }
                >
                    <Button 
                        color={Colors.primary} 
                        title='View Details' 
                        onPress={() => 
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        } 
                    />
                    <Button 
                        color={Colors.primary} 
                        title='To Cart' 
                        onPress={() => 
                            dispatch(cartActions.addToCart(itemData.item))
                        } 
                    />
                </ProductItem>)
            }
        />
    );
}

ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
                    iconName={
                        Platform.OS === 'android' ? 'md-cart' : 'ios-cart'
                    }
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
        ),
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
 
export default ProductOverviewScreen;