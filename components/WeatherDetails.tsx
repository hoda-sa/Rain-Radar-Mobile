/**
 * WeatherDetails Component
 * 
 * Displays detailed weather metrics including feels-like temperature,
 * humidity, wind speed, pressure, and visibility.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeatherDetailsProps {
    feelsLike: number;        // "Feels like" temperature
    humidity: number;         // Humidity percentage
    windSpeed: number;        // Wind speed
    pressure: number;         // Atmospheric pressure
    visibility: number;       // Visibility distance
    tempUnit: string;         // Temperature unit (°C or °F)
    windUnit: string;         // Wind speed unit (m/s or mph)
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
    feelsLike,
    humidity,
    windSpeed,
    pressure,
    visibility,
    tempUnit,
    windUnit
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weather Details</Text>
            <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Feels Like</Text>
                    <Text style={styles.detailValue}>{feelsLike}{tempUnit}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Humidity</Text>
                    <Text style={styles.detailValue}>{humidity}%</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Wind</Text>
                    <Text style={styles.detailValue}>{windSpeed} {windUnit}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Pressure</Text>
                    <Text style={styles.detailValue}>{pressure} hPa</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Visibility</Text>
                    <Text style={styles.detailValue}>{visibility.toFixed(1)} km</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: 'white',
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    detailItem: {
        width: '50%',
        marginBottom: 12,
    },
    detailLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    },
});

export default WeatherDetails;