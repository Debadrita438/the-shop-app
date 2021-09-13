import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useDispatch } from 'react-redux';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/authAction';

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

const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''

        },
        inputValidities: {
            email: false,
            password: false
        },
        isFormValid: false
    });

    const authHandler = async () => {
        let action;
        if(isSignUp) {
            action = authActions.signup(
                formState.inputValues.email, 
                formState.inputValues.password
            )
        } else {
            action = authActions.login(
                formState.inputValues.email, 
                formState.inputValues.password
            );
        }
        setIsLoading(true);
        setError(null);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch(err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(error) {
            Alert.alert('An Error Occured!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            payload: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={30} style={styles.screen}>
            <LinearGradient colors={['#e0ecff', '#b0ceff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id='email'
                            label='E-mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Please enter a valid email address.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input 
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorText='Please enter a valid password.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        {
                            isLoading
                            ? <ActivityIndicator 
                                size='small'
                                color={Colors.primary}
                            />
                            : <Button 
                                title={isSignUp ? 'Sign Up' : 'Login'}
                                color={Colors.primary}
                                onPress={authHandler}
                            />
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title={`Switch to ${isSignUp ? 'Login' : 'Sign up'} `}
                            color={Colors.accent}
                            onPress={() => {
                                setIsSignUp(prevState => !prevState)
                            }}
                        />
                    </View>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authentication'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
})
 
export default AuthScreen;