/**
 * FadeIn Component
 * 
 * A reusable animation wrapper that applies a fade-in effect to its children.
 * Useful for creating smooth transitions when components mount or when data loads.
 */
import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';

interface FadeInProps extends ViewProps {
    duration?: number;          // Animation duration in milliseconds
    delay?: number;             // Delay before animation starts in milliseconds
    initialOpacity?: number;    // Starting opacity value (0-1)
    children: React.ReactNode;  // Child components to animate
}

/**
 * FadeIn component - Provides fade-in animation for child components
 */
const FadeIn: React.FC<FadeInProps> = ({
    duration = 500,             // Default duration: 500ms
    delay = 0,                  // Default delay: 0ms
    initialOpacity = 0,         // Default starting opacity: 0 (invisible)
    children,
    style,
    ...props
}) => {
    // Create an Animated.Value for opacity
    const opacity = useRef(new Animated.Value(initialOpacity)).current;

    useEffect(() => {
        // Start the animation when the component mounts
        Animated.timing(opacity, {
            toValue: 1,
            duration: duration,
            delay: delay,
            useNativeDriver: true, // This improves animation performance
        }).start();

        // Clean up animation when component unmounts
        return () => {
            opacity.setValue(initialOpacity);
        };
    }, []);

    return (
        <Animated.View
            style={[
                { opacity },
                style,
            ]}
            {...props}
        >
            {children}
        </Animated.View>
    );
};

export default FadeIn;