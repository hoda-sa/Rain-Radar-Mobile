// components/FavoriteManager.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../app/context/FavoritesContext';

interface FavoriteManagerProps {
    weatherData: any;
    onPress?: () => void;
}

const FavoriteManager: React.FC<FavoriteManagerProps> = ({ weatherData, onPress }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    if (!weatherData) return null;

    const { name } = weatherData;
    const country = weatherData.sys.country;
    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].description;

    const cityId = `${name}_${country}`.toLowerCase();
    const isFav = isFavorite(name, country);

    const handleToggleFavorite = () => {
        if (isFav) {
            removeFavorite(cityId);
        } else {
            addFavorite({
                id: cityId,
                name,
                country,
                lastTemp: temp,
                lastCondition: condition,
                lastUpdated: Date.now(),
            });
        }

        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isFav ? styles.favorited : styles.notFavorited
            ]}
            onPress={handleToggleFavorite}
        >
            <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={20}
                color={isFav ? 'white' : '#0d6efd'}
                style={styles.icon}
            />
            <Text style={[
                styles.text,
                isFav ? styles.favoritedText : styles.notFavoritedText
            ]}>
                {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
    },
    favorited: {
        backgroundColor: '#ff4757',
    },
    notFavorited: {
        backgroundColor: 'white',
        borderColor: '#0d6efd',
        borderWidth: 1,
    },
    icon: {
        marginRight: 8,
    },
    text: {
        fontWeight: '500',
    },
    favoritedText: {
        color: 'white',
    },
    notFavoritedText: {
        color: '#0d6efd',
    },
});

export default FavoriteManager;