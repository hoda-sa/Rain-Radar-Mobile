/**
 * FavoriteButton Component
 * 
 * A button that allows users to add or remove a city from their favorites.
 * Displays either an outline or filled heart icon based on favorite status.
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../app/context/FavoritesContext';

interface FavoriteButtonProps {
    cityName: string;             // Name of the city
    countryCode: string;          // Country code of the city
    temperature?: number;         // Current temperature (optional)
    condition?: string;           // Weather condition (optional)
    onPress?: () => void;         // Additional callback function (optional)
    size?: number;                // Icon size (optional)
    style?: object;               // Additional styles (optional)
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    cityName,
    countryCode,
    temperature,
    condition,
    onPress,
    size = 24,
    style,
}) => {
    // Get favorite management functions from context
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    // Check if the city is already in favorites
    const isFav = isFavorite(cityName, countryCode);

    const handlePress = () => {
        // Create a unique ID for the city
        const cityId = `${cityName}_${countryCode}`.toLowerCase();

        if (isFav) {
            removeFavorite(cityId);
        } else {
            addFavorite({
                id: cityId,
                name: cityName,
                country: countryCode,
                lastTemp: temperature,
                lastCondition: condition,
                lastUpdated: Date.now(),
            });
        }

        // Call additional onPress handler if provided
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={size}
                color={isFav ? '#ff4757' : '#a2b0bd'}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
    },
});

export default FavoriteButton;