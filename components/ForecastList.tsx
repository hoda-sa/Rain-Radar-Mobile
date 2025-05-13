/**
 * ForecastList Component
 * 
 * Displays a horizontal scrollable list of weather forecasts for the next 5 days.
 * Processes raw forecast data to show one forecast item per day.
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ForecastItem from './ForecastItem';

interface ForecastData {
    dt: number;                // Timestamp (Unix, seconds)
    main: {
        temp: number;          // Temperature
        temp_min?: number;     // Minimum temperature (optional)
        temp_max?: number;     // Maximum temperature (optional)
    };
    weather: Array<{
        description: string;   // Weather condition description
        icon: string;          // Icon code for weather condition
    }>;
}

interface ForecastListProps {
    data: {
        list: ForecastData[];  // Array of forecast data items
    } | null;
    units: 'metric' | 'imperial';  // Units format (Celsius or Fahrenheit)
}

const ForecastList: React.FC<ForecastListProps> = ({ data, units }) => {
    // Return null if no data is provided
    if (!data || !data.list) return null;

    /**
   * Group forecast data by day, selecting one forecast per day
   * OpenWeatherMap provides forecasts in 3-hour intervals for 5 days
   * We want to show one forecast per day, preferably around noon
   */
    const dailyForecast = data.list.reduce<Record<string, ForecastData>>((acc, item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toISOString().split('T')[0];

        // Skip today's remaining forecasts
        if (date.getDate() === new Date().getDate()) {
            return acc;
        }

        // Take only one forecast per day (around noon)
        if (!acc[day] && date.getHours() >= 11 && date.getHours() <= 14) {
            acc[day] = item;
        }

        return acc;
    }, {});

    // Convert to array and limit to 5 days
    const forecastArray = Object.values(dailyForecast).slice(0, 5);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>5-Day Forecast</Text>
            <FlatList
                data={forecastArray}
                keyExtractor={(item) => item.dt.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.forecastItemContainer}>
                        <ForecastItem forecast={item} units={units} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    forecastItemContainer: {
        width: 160,
        marginRight: 12,
        height: 230,
    },
});

export default ForecastList;