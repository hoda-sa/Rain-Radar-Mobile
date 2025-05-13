/**
 * WeatherIcon Component
 * 
 * Renders weather condition icons from the OpenWeatherMap API
 * with customizable sizes.
 */

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { getWeatherIconUrl } from '../utils/weatherApi';

interface WeatherIconProps {
    iconCode: string;                 // Icon code from OpenWeatherMap
    size?: '1x' | '2x' | '3x';        // Size variant of the icon
    alt?: string;                     // Accessibility label
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
    iconCode,
    size = "1x",
    alt = "Weather icon"
}) => {
    const iconUrl = getWeatherIconUrl(iconCode);

    const getIconSize = () => {
        switch (size) {
            case '1x': return { width: 30, height: 30 };
            case '2x': return { width: 50, height: 50 };
            case '3x': return { width: 70, height: 70 };
            default: return { width: 30, height: 30 };
        }
    };

    return (
        <Image
            source={{ uri: iconUrl }}
            style={[styles.weatherIcon, getIconSize()]}
            accessibilityLabel={alt}
        />
    );
};

const styles = StyleSheet.create({
    weatherIcon: {
        // Base styles for the icon
    },
});

export default WeatherIcon;