import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/productsAction';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    switch(action.type) {
        case FORM_INPUT_UPDATE:
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.payload
            }
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            }
            let updatedFormIsValid = true;
            for(const key in updatedValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            }
            return {
                inputValues: updatedValues,
                inputValidities: updatedValidities,
                isFormValid: updatedFormIsValid
            }

        default: 
            return state;
    }
}

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.navigation.getParam('productId');
    const editProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : '',
            imageUrl: editProduct ? editProduct.imageUrl : '',
            price: '',
            description: editProduct ? editProduct.description : ''

        },
        inputValidities: {
            title: editProduct ? true : false,
            imageUrl: editProduct ? true : false,
            price: editProduct ? true : false,
            description: editProduct ? true : false
        },
        isFormValid: editProduct ? true : false
    });

    useEffect(() => {
        if(error) {
            Alert.alert('An error occured!', error, [
                {text: 'Okay'}
            ])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        if(!formState.isFormValid){
            Alert.alert('Wrong Input',
            'Please check the errors in the form', [
                {text: 'Okay'}
            ]
            );
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            if(editProduct) {
                await dispatch(
                    productActions.updateProduct(
                        prodId, 
                        formState.inputValues.title, 
                        formState.inputValues.description, 
                        formState.inputValues.imageUrl
                    )
                )
            } else {
                await dispatch(
                    productActions.createProduct(
                        formState.inputValues.title, 
                        formState.inputValues.description, 
                        formState.inputValues.imageUrl, 
                        +formState.inputValues.price
                    )
                )
            }
            props.navigation.goBack();
        } catch(err) {
            setError(err.message);
        }
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            payload: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    if(isLoading) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}>    
            <ScrollView>
                <View style={styles.form}>
                    <Input 
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editProduct ? editProduct.title : ''}
                        initiallyValid={!!editProduct}
                        required
                    />
                    <Input 
                        id='imageUrl'
                        label='Image Url'
                        errorText='Please enter a valid image url!'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editProduct ? editProduct.imageUrl : ''}
                        initiallyValid={!!editProduct}
                        required
                    />
                    {editProduct ? null : (
                        <Input 
                            id='price'
                            label='Price'
                            errorText='Please enter a valid price!'
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <Input 
                        id='description'
                        label='Description'
                        errorText='Please enter a valid description!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        onInputChange={inputChangeHandler}
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        initialValue={editProduct ? editProduct.description : ''}
                        initiallyValid={!!editProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
 
export default EditProductScreen;