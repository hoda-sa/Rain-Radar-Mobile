/**
 * UnitToggle Component
 * 
 * Provides a toggle button group for switching between metric (°C) and imperial (°F)
 * temperature units throughout the application.
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface UnitToggleProps {
    units: 'metric' | 'imperial'; // Current selected unit
    onUnitChange: (unit: 'metric' | 'imperial') => void;  // Callback when unit changes
}

const UnitToggle: React.FC<UnitToggleProps> = ({ units, onUnitChange }) => {
    return (
        <View style={styles.unitToggle}>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        styles.leftButton,
                        units === 'metric' ? styles.activeButton : styles.inactiveButton
                    ]}
                    onPress={() => onUnitChange('metric')}
                >
                    <Text style={units === 'metric' ? styles.activeText : styles.inactiveText}>
                        °C
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        styles.rightButton,
                        units === 'imperial' ? styles.activeButton : styles.inactiveButton
                    ]}
                    onPress={() => onUnitChange('imperial')}
                >
                    <Text style={units === 'imperial' ? styles.activeText : styles.inactiveText}>
                        °F
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    unitToggle: {
        marginVertical: 10,
        alignItems: 'flex-end',
    },
    buttonGroup: {
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
    },
    leftButton: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderRightWidth: 0,
    },
    rightButton: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    activeButton: {
        backgroundColor: '#0d6efd',
        borderColor: '#0d6efd',
    },
    inactiveButton: {
        backgroundColor: 'transparent',
        borderColor: '#0d6efd',
    },
    activeText: {
        color: 'white',
        fontWeight: '500',
    },
    inactiveText: {
        color: '#0d6efd',
    },
});

export default UnitToggle;