import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import ProductOverviewScreen from '../screen/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screen/shop/ProductDetailScreen';
import CartScreen from '../screen/shop/CartScreen';
import OrderScreen from '../screen/shop/OrderScreen';
import UserProductScreen from '../screen/user/UserProductScreen';
import EditProductScreen from '../screen/user/EditProductScreen';
import AuthScreen from '../screen/user/AuthScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailsScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }
});

const OrdersNavigator = createStackNavigator({
    Orders: OrderScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }
});

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            fontWeight: undefined
        },
        itemsContainerStyle: {
            marginTop: '20%'
        }
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);