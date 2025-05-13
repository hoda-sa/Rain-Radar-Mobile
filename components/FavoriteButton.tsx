// components/FavoriteButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../app/context/FavoritesContext';

interface FavoriteButtonProps {
    cityName: string;
    countryCode: string;
    temperature?: number;
    condition?: string;
    onPress?: () => void;
    size?: number;
    style?: object;
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
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const isFav = isFavorite(cityName, countryCode);

    const handlePress = () => {
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