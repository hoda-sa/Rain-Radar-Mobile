/**
 * SearchBar Component
 * 
 * Provides a search input field with a button that allows users to search
 * for weather information for specific cities.
 */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = () => {
        // Only search if there's a non-empty term after trimming whitespace
        if (searchTerm.trim()) {
            onSearch(searchTerm.trim());
            setSearchTerm('');
        }
    };

    return (
        <View style={styles.searchForm}>
            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Search city..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="search"
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSubmit}
                >
                    <Ionicons name="search" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchForm: {
        marginVertical: 10,
    },
    inputGroup: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 4,
        overflow: 'hidden',
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: 'white',
    },
    searchButton: {
        backgroundColor: '#0d6efd',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SearchBar;