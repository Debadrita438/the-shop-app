import React, { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productActions from '../../store/actions/productsAction';

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');

    const editProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const [title, setTitle] = useState(editProduct ? editProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editProduct ? editProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editProduct ? editProduct.description : '');

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if(editProduct) {
            dispatch(
                productActions.updateProduct(prodId, title, description, imageUrl)
            )
        } else {
            dispatch(
                productActions.createProduct(title, description, imageUrl, +price)
            )
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, price, imageUrl]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        value={title} 
                        onChangeText={text => setTitle(text)} 
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput 
                        style={styles.input} 
                        value={imageUrl} 
                        onChangeText={text => setImageUrl(text)} 
                    />
                </View>
                {editProduct ? null : (<View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input} 
                        value={price} 
                        onChangeText={text => setPrice(text)} 
                    />
                </View>)}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} 
                        value={description} 
                        onChangeText={text => setDescription(text)} 
                    />
                </View>
            </View>
        </ScrollView>
    );
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') 
            ? 'Edit Product' 
            : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Save'
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={submitFn}
                />
            </HeaderButtons> 
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})
 
export default EditProductScreen;