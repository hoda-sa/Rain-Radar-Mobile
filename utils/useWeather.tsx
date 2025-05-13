/**
 * Weather Hook
 * 
 * A custom React hook that manages weather data fetching, state management,
 * and user interactions like searching for cities and changing temperature units.
 * 
 * @module hooks/useWeather
 */

import { useState, useEffect } from 'react';
import { fetchWeatherByCity, fetchForecastByCity } from './weatherApi';

// Types for the weather and forecast data
export interface WeatherData {
    name: string;
    sys: {
        country: string;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        temp_min?: number;
        temp_max?: number;
    };
    wind: {
        speed: number;
        deg?: number;
    };
    visibility: number;
    timezone: number;
    dt: number;
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min?: number;
            temp_max?: number;
            pressure: number;
            humidity: number;
        };
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg?: number;
        };
        visibility: number;
        pop?: number;
        sys?: {
            pod: string;
        };
        dt_txt: string;
    }>;
    city: {
        id: number;
        name: string;
        country: string;
        timezone: number;
    };
}

// Type for the units
export type UnitType = 'metric' | 'imperial';

// Type for the hook return value
interface UseWeatherReturn {
    weatherData: WeatherData | null;
    forecastData: ForecastData | null;
    loading: boolean;
    error: string | null;
    city: string;
    units: UnitType;
    handleSearch: (city: string) => void;
    handleUnitChange: (unit: UnitType) => void;
}

/**
 * Custom hook for fetching and managing weather data
 * @param defaultCity - Default city to load weather for
 * @returns Weather data, state, and handler functions
 */
const useWeather = (defaultCity: string = 'vancouver'): UseWeatherReturn => {
    // Setting up state variables to store information
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);  // Current weather
    const [forecastData, setForecastData] = useState<ForecastData | null>(null);  // 5-day forecast
    const [loading, setLoading] = useState<boolean>(false);  // Is data currently loading?
    const [error, setError] = useState<string | null>(null);  // Any errors that occurred
    const [city, setCity] = useState<string>(defaultCity);  // Current city being displayed
    const [units, setUnits] = useState<UnitType>('metric');  // Temperature units (Celsius by default)

    // Function to fetch weather data from the API
    const fetchWeatherData = async (searchCity: string): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            // Make API calls to get both current weather and forecast
            const weather = await fetchWeatherByCity(searchCity, units);
            const forecast = await fetchForecastByCity(searchCity, units);

            // Store the results in state
            setWeatherData(weather);
            setForecastData(forecast);
            setCity(searchCity);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(`Error fetching weather data: ${errorMessage}`);
            setWeatherData(null);
            setForecastData(null);
        } finally {
            setLoading(false);
        }
    };

    // Function that components can call to search for a city
    const handleSearch = (searchCity: string): void => {
        if (searchCity) {
            fetchWeatherData(searchCity);
        }
    };

    // Function that components can call to change units
    const handleUnitChange = (newUnit: UnitType): void => {
        setUnits(newUnit);
    };

    // Fetch weather data when units change or initial load
    useEffect(() => {
        if (city) {
            fetchWeatherData(city);
        }
    }, [units]); // The dependency array - this effect runs when units changes

    // Initial fetch on component mount
    useEffect(() => {
        fetchWeatherData(defaultCity); // Load initial weather data
    }, []); // Empty dependency array means "run once on mount"

    // Return all the data and functions that components might need
    return {
        weatherData,
        forecastData,
        loading,
        error,
        city,
        units,
        handleSearch,
        handleUnitChange
    };
};

export default useWeather;