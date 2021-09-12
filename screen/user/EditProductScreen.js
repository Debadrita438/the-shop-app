import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EditProductScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>The Adding/Editing Product Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
 
export default EditProductScreen;