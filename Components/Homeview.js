import {Button, Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, { useState, useEffect } from "react";
import Toast from "react-native-root-toast";

export default function Homeview({ route, navigation }) {
    let [counter, setCounter] = useState(0);

    let {zikr} = route.params || ''


    let {nmbrZikr} = route.params || ""


    function countfunc() {
        setCounter(counter + 1);
        if (zikr && nmbrZikr !== '' && counter === 33) {
            setCounter(0)
            let toast = Toast.show("zikr Completed", {
                duration: Toast.durations.SHORT
            })
        }else {
            setCounter(counter + 1);
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
                ) : null }


            </View>
            <View style={styles.imgContainer}>
                {/*LR images*/}
                <View style={styles.lrbtn}>
                    <TouchableOpacity style={styles.limage}>
                        <Image source={require("../assets/left.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rimage}>
                        <Image source={require("../assets/right.png")} />
                    </TouchableOpacity>
                </View>
                {/*main dial*/}
                <TouchableOpacity onPress={countfunc}>
                    <ImageBackground style={styles.img} source={require("../assets/circlewatch.png")}>
                        <Text style={styles.txt}>{counter}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity onPress={resetFunc}>
                    <Image style={styles.resetImage} source={require("../assets/reset.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.vibrateImage} source={require("../assets/vibearation.png")} />
                </TouchableOpacity>
            </View>
            {/*Navigation   */}
            <View style={styles.btnList}>
                <TouchableOpacity style={styles.savebtn}>
                    <Text style={styles.savetxt}>
                        Save
                    </Text>
                </TouchableOpacity>
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
        backgroundColor: "white"
    },
    imgContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    txt: {
        color: 'white',
        fontSize: 42,
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
        justifyContent: "center"
    },
    headtxt: {
        fontSize: 40,
    },
    lrbtn: {
        flexDirection: "row",
    },
    limage: {
        paddingRight: 250
    },
    resetImage: {
        width: 30,
        height: 30
    },
    vibrateImage: {
        width: 30,
        height: 30
    },
    btnList: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    savebtn: {
        borderRadius: 10,
        backgroundColor: "green",
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    listbtn: {
        borderRadius: 10,
        backgroundColor: "green",
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    savetxt: {
        fontSize: 20,
        color: "white"
    },
    zikrtxt: {
        fontSize: 20,
        color: "white",
        padding: 5
    }
});