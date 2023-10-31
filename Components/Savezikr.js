import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native'; // Import the useFocusEffect hook

export default function Savezikr({ navigation }) {
    const [savedZikr, setSavedZikr] = useState([]);
    const STORAGE_KEY = 'savedZikrData';

    const loadSavedZikr = async () => {
        try {
            const savedData = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedData !== null) {
                setSavedZikr(JSON.parse(savedData));
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadSavedZikr();
        }, [])
    );

    const deleteItem = async (index) => {
        const updatedSavedZikr = [...savedZikr];
        updatedSavedZikr.splice(index, 1);
        setSavedZikr(updatedSavedZikr);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSavedZikr));
    };

    const navigateToHomeView = (zikr, nmbrZikr) => {
        // Navigate to Homeview and pass zikr and nmbrZikr as parameters
        navigation.navigate('Home', { zikr, nmbrZikr });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={savedZikr}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => navigateToHomeView(item.zikrName, item.numberZikr)}>
                        <View style={styles.zikrItem}>
                            <Text style={styles.zikrText}>{item.zikrName}</Text>
                            <Text style={styles.zikrText}>{item.numberZikr}</Text>
                            <TouchableOpacity onPress={() => deleteItem(index)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    zikrItem: {
        flexDirection: 'row',
        backgroundColor: 'lightgreen',
        margin: 5,
        width: 350,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    zikrText: {
        fontSize: 18,
        color: "white",
    },
    deleteButton: {
        color: "red",
    },
});
