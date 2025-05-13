import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingSpinner: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0d6efd" />
            <Text style={styles.text}>Loading weather data...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginVertical: 20,
    },
    text: {
        marginTop: 12,
        fontSize: 16,
        color: '#555',
    },
});

export default LoadingSpinner;