
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface FavoriteCity {
    id: string; // Using city_country as unique ID
    name: string;
    country: string;
    lastTemp?: number;
    lastCondition?: string;
    lastUpdated?: number; // timestamp
}

interface FavoritesContextType {
    favorites: FavoriteCity[];
    loading: boolean;
    addFavorite: (city: FavoriteCity) => Promise<void>;
    removeFavorite: (cityId: string) => Promise<void>;
    updateFavorite: (city: FavoriteCity) => Promise<void>;
    isFavorite: (cityName: string, countryCode: string) => boolean;
}

// Create context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Storage key
const STORAGE_KEY = 'weather_favorites';

// Provider component
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Load favorites on mount
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);

                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    // Save favorites to storage whenever they change
    useEffect(() => {
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
            } catch (error) {
                console.error('Error saving favorites:', error);
            }
        };

        // Only save if we've finished initial loading
        if (!loading) {
            saveFavorites();
        }
    }, [favorites, loading]);

    // Add a city to favorites
    const addFavorite = async (city: FavoriteCity) => {
        setFavorites(currentFavorites => {
            // Check if city already exists
            const cityExists = currentFavorites.some(
                fav => fav.id === city.id
            );

            if (!cityExists) {
                return [...currentFavorites, city];
            }

            return currentFavorites;
        });
    };

    // Remove a city from favorites
    const removeFavorite = async (cityId: string) => {
        setFavorites(currentFavorites =>
            currentFavorites.filter(city => city.id !== cityId)
        );
    };

    // Update a favorite with new data
    const updateFavorite = async (updatedCity: FavoriteCity) => {
        setFavorites(currentFavorites =>
            currentFavorites.map(city =>
                city.id === updatedCity.id ? { ...city, ...updatedCity } : city
            )
        );
    };

    // Check if a city is already in favorites
    const isFavorite = (cityName: string, countryCode: string) => {
        const cityId = `${cityName}_${countryCode}`.toLowerCase();
        return favorites.some(city => city.id.toLowerCase() === cityId);
    };

    // Context value
    const contextValue = {
        favorites,
        loading,
        addFavorite,
        removeFavorite,
        updateFavorite,
        isFavorite
    };

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Custom hook for using the favorites context
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export default function FavoritesContextPage() {
    return null;
}