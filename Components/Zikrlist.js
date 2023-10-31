import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Button,  } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage/";

export default function Zikrlist({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [zikrName, setZikrName] = useState("");
    const [numberZikr, setNumberZikr] = useState("");
    const [savedData, setSavedData] = useState([]);
    const STORAGE_KEY = 'savedZikrData';

    const modalClose = () => {
        setModalVisible(false);
    };

    const alhamd = () => {
        navigation.navigate('Home', { zikr: "الحمد لله", nmbrZikr: "33" });
    };

    const istagfar = () => {
        navigation.navigate("Home", { zikr: "أستغفر اللّٰه", nmbrZikr: "33" });
    };

    const allahhuakbar = () => {
        navigation.navigate('Home', { zikr: " الله أكبر", nmbrZikr: "33" });
    };

    const saveData = async () => {
        const newZikrData = {
            zikrName,
            numberZikr,
        };
        const updatedSavedData = [...savedData, newZikrData];
        setSavedData(updatedSavedData);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSavedData));
        modalClose();
        setZikrName("");
        setNumberZikr("");
        navigation.navigate('YourZikr');
    };

    useEffect(() => {
        const loadData = async () => {
            const savedDataJson = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedDataJson) {
                const parsedData = JSON.parse(savedDataJson);
                setSavedData(parsedData);
            }
        };

        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={alhamd}>
                    <View style={styles.direction}>
                        <Text style={styles.zikrfont}> 33</Text>
                        <Text style={styles.zikrfont}> الحمد لله</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={istagfar}>
                    <View style={styles.direction}>
                        <Text style={styles.zikrfont}> 33</Text>
                        <Text style={styles.zikrfont}> أستغفر اللّٰه</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={allahhuakbar}>
                    <View style={styles.direction}>
                        <Text style={styles.zikrfont}> 33</Text>
                        <Text style={styles.zikrfont}> الله أكبر</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    modalClose();
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="zikr name"
                            style={[styles.input, styles.placeholder]}
                            value={zikrName}
                            onChangeText={(text) => setZikrName(text)}
                        />
                        <TextInput
                            placeholder="number of zikr"
                            style={[styles.input, styles.placeholder]}
                            value={numberZikr}
                            onChangeText={(text) => setNumberZikr(text)}
                        />
                        <Button title="Save" onPress={saveData} color="lightgreen" />
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addBtn}>
                <Image source={require("../assets/plus.png")} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center",
    },
    direction: {
        flexDirection: "row",
        backgroundColor: "lightgreen",
        margin: 5,
        width: 350,
        height: 150,
        borderRadius: 20
    },
    zikrfont: {
        fontSize: 40,
        padding: 20,
        marginLeft: 25,
        marginTop: 25,
        color: "white"
    },
    addBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    input: {
        borderWidth: 1,
        borderColor: "lightgreen",
        marginBottom: 10,
    },
    placeholder: {
        padding: 10, // Add padding to the placeholder text
    },
});
