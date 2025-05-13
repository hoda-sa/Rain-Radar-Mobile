/**
 * Weather API Service
 * 
 * This module provides functions to interact with the OpenWeatherMap API,
 * fetching current weather and forecast data for specified cities.
 * 
 * @module utils/weatherApi
 */

import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.openWeatherApiKey || "";

// Base URL for all OpenWeatherMap API endpoints
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Types for the functions
export interface WeatherResponse {
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

export interface ForecastResponse {
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

export type UnitType = 'metric' | 'imperial';

/**
 * Fetches current weather data for a city
 * @param city - The name of the city
 * @param units - The units to use (metric or imperial)
 * @returns Promise with weather data
 */
export const fetchWeatherByCity = async (
    city: string,
    units: UnitType = "metric"
): Promise<WeatherResponse> => {
    try {
        // Make API request to get current weather
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
        );

        if (!response.ok) {
            throw new Error("Weather data not found!");
        }

        return await response.json();
    } catch (error) {
        // Re-throw any errors for handling in the component
        throw error;
    }
};

/**
 * Fetches 5-day forecast data for a city
 * @param city - The name of the city
 * @param units - The units to use (metric or imperial)
 * @returns Promise with forecast data
 */
export const fetchForecastByCity = async (
    city: string,
    units: UnitType = "metric"
): Promise<ForecastResponse> => {
    try {
        // Make API request to get 5-day forecast
        const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
        );

        if (!response.ok) {
            throw new Error("Forecast data not found!");
        }

        return await response.json();
    } catch (error) {
        // Re-throw any errors for handling in the component
        throw error;
    }
};

/**
 * This function generates a URL for weather icons based on the icon code
 * @param iconCode - The icon code from OpenWeatherMap (e.g., "01d", "10n")
 * @returns The complete URL to fetch the weather icon
 * 
 * Example icon codes:
 * - 01d: clear sky (day)
 * - 02d: few clouds (day)
 * - 10d: rain (day)
 * - 01n: clear sky (night)
 * 
 * The @2x part of the URL requests a larger icon size.
 */
export const getWeatherIconUrl = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};