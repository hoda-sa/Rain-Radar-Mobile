// components/FadeIn.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';

interface FadeInProps extends ViewProps {
    duration?: number;
    delay?: number;
    initialOpacity?: number;
    children: React.ReactNode;
}

const FadeIn: React.FC<FadeInProps> = ({
    duration = 500,
    delay = 0,
    initialOpacity = 0,
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

        // Optional: Clean up animation when component unmounts
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