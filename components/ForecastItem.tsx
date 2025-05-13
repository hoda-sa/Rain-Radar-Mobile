import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getWeatherIconUrl } from '../utils/weatherApi';

interface ForecastData {
    dt: number;
    main: {
        temp: number;
        temp_min?: number;
        temp_max?: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
}

interface ForecastItemProps {
    forecast: ForecastData;
    units: 'metric' | 'imperial';
}

const ForecastItem: React.FC<ForecastItemProps> = ({ forecast, units }) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = date.getDate();

    const temp = Math.round(forecast.main.temp);
    const description = forecast.weather[0].description;
    const iconCode = forecast.weather[0].icon;
    const iconUrl = getWeatherIconUrl(iconCode);

    const tempUnit = units === 'metric' ? '°C' : '°F';

    // Get min and max temp if available
    const minTemp = forecast.main.temp_min ? Math.round(forecast.main.temp_min) : null;
    const maxTemp = forecast.main.temp_max ? Math.round(forecast.main.temp_max) : null;

    // Get weather condition based on icon code
    const getWeatherConditionStyle = (code: string) => {
        if (code.includes('01') || code.includes('02')) return styles.sunny;
        if (code.includes('03') || code.includes('04')) return styles.cloudy;
        if (code.includes('09') || code.includes('10')) return styles.rainy;
        if (code.includes('11')) return styles.stormy;
        if (code.includes('13')) return styles.snowy;
        return {};
    };

    const conditionStyle = getWeatherConditionStyle(iconCode);

    return (
        <View style={[styles.forecastItem, conditionStyle]}>
            <View style={styles.dateSection}>
                <Text style={styles.dayText}>{day}</Text>
                <Text style={styles.dateText}>{month} {dayNum}</Text>
            </View>

            <Image
                source={{ uri: iconUrl }}
                style={styles.forecastIcon}
            />

            <View style={styles.tempContainer}>
                <Text style={styles.tempText}>{temp}{tempUnit}</Text>

                {minTemp && maxTemp && minTemp !== maxTemp && (
                    <View style={styles.minMaxContainer}>
                        <Text style={styles.maxTemp}>{maxTemp}{tempUnit}</Text>
                        <Text style={styles.separator}>/</Text>
                        <Text style={styles.minTemp}>{minTemp}{tempUnit}</Text>
                    </View>
                )}
            </View>

            <Text style={styles.description}>
                {description}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    forecastItem: {
        height: '100%',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    dateSection: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 8,
        marginBottom: 8,
        width: '100%',
        alignItems: 'center',
    },
    dayText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    dateText: {
        color: '#757575',
        fontSize: 14,
    },
    forecastIcon: {
        width: 70,
        height: 70,
        marginVertical: 8,
    },
    tempContainer: {
        marginBottom: 8,
        alignItems: 'center',
    },
    tempText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    minMaxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    maxTemp: {
        color: '#2196F3',
        fontSize: 12,
    },
    separator: {
        color: '#9e9e9e',
        marginHorizontal: 4,
        fontSize: 12,
    },
    minTemp: {
        color: '#757575',
        fontSize: 12,
    },
    description: {
        textTransform: 'capitalize',
        fontWeight: '300',
        textAlign: 'center',
        fontSize: 14,
    },
    // Weather condition styles
    sunny: {
        backgroundColor: '#FFECB3',
    },
    cloudy: {
        backgroundColor: '#E0E0E0',
    },
    rainy: {
        backgroundColor: '#BBDEFB',
    },
    stormy: {
        backgroundColor: '#C5CAE9',
    },
    snowy: {
        backgroundColor: '#F5F5F5',
    },
});

export default ForecastItem;