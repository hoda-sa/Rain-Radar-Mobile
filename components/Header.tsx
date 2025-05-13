import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeatherIcon from './WeatherIcon';

const Header: React.FC = () => {
    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <WeatherIcon iconCode="09d" size="3x" />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Rain Radar</Text>
                    <Text style={styles.subtitle}>Rain or shine, always keeping you prepared</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0d6efd',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        marginLeft: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 14,
        color: 'white',
        opacity: 0.9,
    },
});

export default Header;