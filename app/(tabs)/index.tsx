import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { registerRootComponent } from 'expo';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import FavoriteManager from '../../components/FavoriteManager';
import FavoriteButton from '../../components/FavoriteButton';
import FadeIn from '../../components/FadeIn';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CurrentWeather from '../../components/CurrentWeather';
import ForecastList from '../../components/ForecastList';
import UnitToggle from '../../components/UnitToggle';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import useWeather from '../../utils/useWeather';

// Feature card component for the features section
interface FeatureCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconName, iconColor, title, description }) => (
  <View style={styles.featureCard}>
    <Ionicons name={iconName} size={50} color={iconColor} style={styles.featureIcon} />
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

// Main App component
const App: React.FC = () => {

  const insets = useSafeAreaInsets();
  const { city } = useLocalSearchParams<{ city?: string }>();
  // Use the weather custom hook
  const {
    weatherData,
    forecastData,
    loading,
    error,
    units,
    handleSearch,
    handleUnitChange
  } = useWeather('Vancouver');

  useEffect(() => {
    if (city) {
      handleSearch(city);
    }
  }, [city]);


  return (

    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d6efd" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <Header />
        <ScrollView
          style={styles.mainContent}
          contentContainerStyle={styles.scrollContent}
        >
          <FadeIn duration={500}>
            <View style={styles.searchContainer}>
              <View style={styles.searchBarWrapper}>
                <SearchBar onSearch={handleSearch} />
              </View>
              <View style={styles.unitToggleWrapper}>
                <UnitToggle units={units} onUnitChange={handleUnitChange} />
              </View>
            </View>
          </FadeIn>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <FadeIn duration={500}>
              <ErrorAlert message={error || 'An error occurred'} />
            </FadeIn>
          ) : (
            <>
              <FadeIn duration={600} delay={200}>
                {weatherData && (
                  <>
                    <CurrentWeather data={weatherData} units={units} />
                    <FavoriteManager weatherData={weatherData} />
                  </>
                )}
              </FadeIn>


              <FadeIn duration={600} delay={500}>
                {forecastData && <ForecastList data={forecastData} units={units} />}
              </FadeIn>
            </>
          )}

          <FadeIn duration={600} delay={800}>
            <View style={styles.divider} />

            <View style={styles.featuresSection}>
              <Text style={styles.featuresSectionTitle}>WHAT THIS APP OFFERS</Text>

              <View style={styles.featureCardsContainer}>
                <FadeIn duration={400} delay={900}>
                  <FeatureCard
                    iconName="globe-outline"
                    iconColor="#0d6efd"
                    title="Global Coverage"
                    description="Access real-time weather data for cities worldwide with our comprehensive coverage."
                  />
                </FadeIn>

                <FadeIn duration={400} delay={1000}>
                  <FeatureCard
                    iconName="bar-chart-outline"
                    iconColor="#198754"
                    title="5-Day Forecast"
                    description="Plan ahead with accurate 5-day weather forecasts for your location."
                  />
                </FadeIn>

                <FadeIn duration={400} delay={1100}>
                  <FeatureCard
                    iconName="flash-outline"
                    iconColor="#ffc107"
                    title="Fast & Intuitive"
                    description="Experience our lightning-fast, intuitive design that works smoothly."
                  />
                </FadeIn>
              </View>
            </View>
          </FadeIn>
        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  flex: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  footerContainer: {
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  searchBarWrapper: {
    flex: 2,
    marginRight: 8,
    minWidth: 200,
  },
  unitToggleWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 100,
  },
  weatherContent: {
    opacity: 1, // You'll need to implement fade-in animation for React Native
  },
  divider: {
    height: 1,
    backgroundColor: '#dee2e6',
    marginVertical: 24,
  },
  featuresSection: {
    marginVertical: 20,
  },
  featuresSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  featureCardsContainer: {
    flexDirection: 'column',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featureDescription: {
    textAlign: 'center',
    color: '#6c757d',
    lineHeight: 20,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
});

export default App;

// Register the main component with Expo
registerRootComponent(App);