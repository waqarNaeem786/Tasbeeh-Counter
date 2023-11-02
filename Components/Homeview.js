import { Button, Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Vibration } from 'react-native';
import React, { useState } from "react";
import Toast from "react-native-root-toast";

export default function Homeview({ route, navigation }) {
    const [counter, setCounter] = useState(0);
    const [vibrate, setVibrate] = useState(false);
    const watches = ['circle1', 'circle2', 'circle3', 'circle3', 'circlewrist1', 'circlewrist2', 'circlewrist3', "wrist1", "wrist2"];
    const [currentWatchIndex, setCurrentWatchIndex] = useState(0);

    // Define a mapping of image names to require statements
    const watchImages = {
        'circle1': require('../assets/circle1.png'),
        'circle2': require('../assets/circle2.png'),
        'circle3': require('../assets/circle3.png'),
        'circlewrist1': require('../assets/circlewrist1.png'),
        'circlewrist2': require('../assets/circlewrist2.png'),
        'circlewrist3': require('../assets/circlewrist3.png'),
        'wrist1': require('../assets/wrist1.png'),
        'wrist2': require('../assets/wrist2.png'),
    };

    const { zikr } = route.params || '';
    const { nmbrZikr } = route.params || "";

    const changeDialImage = (increment) => {
        let newIndex = currentWatchIndex + increment;
        if (newIndex < 0) {
            newIndex = watches.length - 1;
        } else if (newIndex >= watches.length) {
            newIndex = 0;
        }
        setCurrentWatchIndex(newIndex);
    };

    function countfunc() {
        if (vibrate) {
            Vibration.vibrate();
        }
        setCounter(counter + 1);
        if (zikr && nmbrZikr !== '' && counter === 33) {
            setCounter(0);
            let toast = Toast.show("zikr Completed", {
                duration: Toast.durations.SHORT,
            });
        }
    }

    // Handle the counter reset logic based on zikr
    const resetFunc = () => setCounter(0);

    function nxtFragmnt() {
        navigation.navigate('Zikr');
    }

    return (
        <View style={styles.container}>
            <View style={styles.zikrHead}>
                {zikr && nmbrZikr !== "" ? (
                    <>
                        <Text style={styles.headtxt}>{zikr}</Text>
                        <Text style={styles.headtxt}>{nmbrZikr}</Text>
                    </>
                ) : null}
            </View>
            <View style={styles.imgContainer}>
                {/*LR images*/}
                <View style={styles.lrbtn}>
                    <TouchableOpacity style={styles.limage} onPress={() => changeDialImage(-1)}>
                        <Image source={require("../assets/left.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rimage} onPress={() => changeDialImage(1)}>
                        <Image source={require("../assets/right.png")} />
                    </TouchableOpacity>
                </View>
                {/*main dial*/}
                <TouchableOpacity onPress={countfunc}>
                    <ImageBackground style={styles.img} source={watchImages[watches[currentWatchIndex]]}>
                        <Text style={styles.txt}>{counter}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity onPress={resetFunc}>
                    <Image style={styles.resetImage} source={require("../assets/reset.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setVibrate(!vibrate) }}>
                    <Image style={styles.vibrateImage} source={require("../assets/vibearation.png")} />
                </TouchableOpacity>
            </View>
            {/*Navigation   */}
            <View style={styles.btnList}>
                <TouchableOpacity onPress={nxtFragmnt} style={styles.listbtn}>
                    <Text style={styles.zikrtxt}>
                        Zikr List
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    imgContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    txt: {
        color: 'white',
        fontSize: 80,
        lineHeight: 350,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    img: {
        width: 300,
        height: 300,
    },
    btn: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    zikrHead: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    headtxt: {
        fontSize: 40,
    },
    lrbtn: {
        flexDirection: "row",
    },
    limage: {
        paddingRight: 250,
    },
    resetImage: {
        width: 30,
        height: 30,
    },
    vibrateImage: {
        width: 30,
        height: 30,
    },
    btnList: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    savebtn: {
        borderRadius: 10,
        backgroundColor: "green",
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    listbtn: {
        borderRadius: 10,
        backgroundColor: "green",
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    savetxt: {
        fontSize: 20,
        color: "white",
    },
    zikrtxt: {
        fontSize: 20,
        color: "white",
        padding: 5,
    },
});
