import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserProductScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>The Users Product Screen</Text>
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
 
export default UserProductScreen;