/**
 * UnitToggle Component
 * 
 * A toggle button group that allows users to switch between metric (°C) and imperial (°F)
 * temperature units. Changes to the selected unit are communicated to the parent component
 * via the onUnitChange callback.
 * 
 * @module components/UnitToggle
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * Interface for UnitToggle component props
 */
interface UnitToggleProps {
    /** Current unit system ('metric' or 'imperial') */
    units: 'metric' | 'imperial';
    /** Callback function to handle unit changes */
    onUnitChange: (unit: 'metric' | 'imperial') => void;
}

/**
 * UnitToggle functional component
 * 
 * @param props - Component props
 * @returns Rendered toggle button component
 */
const UnitToggle: React.FC<UnitToggleProps> = ({ units, onUnitChange }) => {
    /**
     * Toggles between metric and imperial units
     * Switches from the current unit to the alternative
     */
    const handleToggle = (): void => {
        const newUnit = units === 'metric' ? 'imperial' : 'metric';
        onUnitChange(newUnit);
    };

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
                    accessibilityLabel="Set temperature unit to Celsius"
                    accessibilityRole="button"
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
                    accessibilityLabel="Set temperature unit to Fahrenheit"
                    accessibilityRole="button"
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