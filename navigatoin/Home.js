import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, StatusBar } from 'react-native';

export function HomeScreen({ navigation }) {
    const getCountries = async () => {
        const respone = await fetch('https://countriesnow.space/api/v0.1/countries');
        const contries = await respone.json();
        console.log(contries);
    }
    return (
        <View style={styles.container}>
            <StatusBar></StatusBar>
            <TextInput
                style={styles.place}
                autoCorrect
                placeholderTextColor={'gray'}
                returnKeyType="done" />
        </View>
    );
}


useEffect(() => {
    getCountries();
}, []);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'tomato',
    },
    place: {
        borderColor: 'black',
        backgroundColor: 'black'
    },
});

export default HomeScreen;