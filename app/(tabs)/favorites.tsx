import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites, FavoriteCity } from '../context/FavoritesContext';
import { fetchWeatherByCity } from '../../utils/weatherApi';
import { useRouter, router } from 'expo-router';
import { RefreshControl } from 'react-native';

export default function FavoritesScreen() {
  const { favorites, removeFavorite, updateFavorite } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();


  // Remove a city with confirmation
  const confirmRemove = (cityId: string, cityName: string) => {
    Alert.alert(
      "Remove Favorite",
      `Are you sure you want to remove ${cityName} from your favorites?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => removeFavorite(cityId),
          style: "destructive"
        }
      ]
    );
  };

  // Add refresh function
  const refreshFavorites = async () => {
    setRefreshing(true);

    try {
      // Update each favorite's weather data
      const updatePromises = favorites.map(async (favorite) => {
        try {
          const weatherData = await fetchWeatherByCity(favorite.name);

          if (weatherData) {
            updateFavorite({
              ...favorite,
              lastTemp: weatherData.main.temp,
              lastCondition: weatherData.weather[0].description,
              lastUpdated: Date.now()
            });
          }
        } catch (error) {
          console.error(`Error updating ${favorite.name}:`, error);
        }
      });

      await Promise.all(updatePromises);
    } catch (error) {
      console.error('Error refreshing favorites:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Render a favorite city item with proper typing
  const renderFavoriteItem = ({ item }: { item: FavoriteCity }) => {
    const formattedDate = item.lastUpdated
      ? new Date(item.lastUpdated).toLocaleString()
      : 'Never';

    // funsction to show favorite's city's weather
    const handlePress = () => {
      // Use router.push to navigate to the index screen with the city name as a parameter
      router.push({
        pathname: '/(tabs)',
        params: { city: item.name }
      });
    };

    return (
      <TouchableOpacity
        style={styles.favoriteCard}
        onPress={handlePress}
      >
        <View style={styles.favoriteInfo}>
          <Text style={styles.cityName}>{item.name}</Text>
          <Text style={styles.countryName}>{item.country}</Text>

          {item.lastTemp && (
            <Text style={styles.temperature}>
              {Math.round(item.lastTemp)}°
            </Text>
          )}

          {item.lastCondition && (
            <Text style={styles.condition}>
              {item.lastCondition}
            </Text>
          )}

          <Text style={styles.lastUpdated}>
            Last updated: {formattedDate}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => confirmRemove(item.id, item.name)}
        >
          <Ionicons name="trash-outline" size={20} color="#dc3545" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Favorite Cities</Text>

        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#6c757d" />
            <Text style={styles.emptyText}>
              You haven't added any favorite cities yet.
            </Text>
            <Text style={styles.emptySubtext}>
              Search for a city and tap the heart icon to add it to your favorites.
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={renderFavoriteItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshFavorites}
                colors={['#0d6efd']}
                tintColor="#0d6efd"
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Match this with your container background
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#212529',
  },
  favoriteCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  countryName: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d6efd',
  },
  condition: {
    fontSize: 14,
    color: '#495057',
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 4,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
});