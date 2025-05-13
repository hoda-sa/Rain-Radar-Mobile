/**
 * ErrorAlert Component
 * 
 * Displays an error message when weather data cannot be retrieved,
 * providing user-friendly information about the error and offering
 * suggestions to resolve the issue.
 */


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorAlertProps {
    message: string;
}

/**
 * ErrorAlert component - Displays error messages in a user-friendly format
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
    return (
        <View style={styles.alertContainer}>
            <View style={styles.alertContent}>
                <Ionicons name="warning" size={28} color="#dc3545" style={styles.icon} />
                <View style={styles.messageContainer}>
                    <Text style={styles.alertHeading}>Weather Data Not Found</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.helpText}>
                        Please try searching for a different city name, check your spelling, or verify your internet connection.
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.reloadButton}
                onPress={() => {
                    // placeholder for reload function
                    console.log('App should reload');
                }}
            >
                <Ionicons name="refresh" size={18} color="#dc3545" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Reload Application</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        borderWidth: 1,
        borderRadius: 4,
        padding: 16,
        marginVertical: 16,
    },
    alertContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    icon: {
        marginRight: 12,
        marginTop: 2,
    },
    messageContainer: {
        flex: 1,
    },
    alertHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#721c24',
        marginBottom: 8,
    },
    message: {
        fontSize: 16,
        color: '#721c24',
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#f5c6cb',
        marginVertical: 8,
    },
    helpText: {
        fontSize: 14,
        color: '#721c24',
    },
    reloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: '#dc3545',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginTop: 12,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: '#dc3545',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ErrorAlert;