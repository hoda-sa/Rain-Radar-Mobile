import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const Footer: React.FC = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>
                Weather Forecasting App © Hoda Aghaei {new Date().getFullYear()} | Powered by{' '}
                <Text
                    style={styles.link}
                    onPress={() => Linking.openURL('https://openweathermap.org/')}
                >
                    OpenWeatherMap API
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#343a40',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    link: {
        color: 'white',
        textDecorationLine: 'underline',
    },
});

export default Footer;