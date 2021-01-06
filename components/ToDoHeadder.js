import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import ColorsConst from '../constants/colors';
var Colors = ColorsConst;

const InspectionHeader = (props) => {
    Colors = global.colors;
    const [modeText, setModeText] = global.darkMode ? useState("Light Mode") : useState("Dark Mode")
    setStyles();
    toggleDarkMode = () => {

        //console.log(Colors.red);

    }

    return <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.discardButton} onPress={props.onPress}>
            <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.darkModeButton} onPressOut={toggleDarkMode} onPress={props.toggleDarkMode}>
            <Text style={styles.btnText}>{modeText}</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>To Do List</Text>

    </View>

};

function setStyles() {
    styles = StyleSheet.create({
        pageHeader: {
            marginTop: 20,
            flexDirection: "row",
            maxWidth: 500,
            width: "100%",
            height: 80,
            alignSelf: "center",
        },
        pageTitle: {
            flex: 1,
            flexWrap: "wrap",
            color: Colors.lightBlack,
            marginLeft: "7%",
            fontSize: 32,
            fontWeight: "bold",
            alignSelf: "center",
        },
        discardButton: {
            backgroundColor: Colors.red,
            borderRadius: 10,
            width: 75,
            height: "100%",
            marginLeft: 20,
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.26,
            elevation: 8,
            color: Colors.whiteForText,
        },
        btnText: {
            color: Colors.whiteForText,
            fontWeight: 'bold',
            fontSize: 20,
            textShadowColor: global.darkMode ? Colors.black : Colors.iOSWhite,
            textShadowRadius: 10,
        },
        darkModeButton: {
            backgroundColor: Colors.red,
            borderRadius: 10,
            width: 75,
            height: "100%",
            marginLeft: 20,
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.26,
            elevation: 8,
            color: Colors.iOSWhite,
        }
    });
}

var styles = StyleSheet.create({
    pageHeader: {
        marginTop: 20,
        flexDirection: "row",
        maxWidth: 500,
        width: "100%",
        height: 80,
        alignSelf: "center",
    },
    pageTitle: {
        flex: 1,
        flexWrap: "wrap",
        color: Colors.lightBlack,
        marginLeft: "7%",
        fontSize: 32,
        fontWeight: "bold",
        alignSelf: "center",
    },
    discardButton: {
        backgroundColor: Colors.red,
        borderRadius: 10,
        width: 75,
        height: "100%",
        marginLeft: 20,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        color: Colors.whiteForText,
    },
    btnText: {
        color: Colors.whiteForText,
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor: "black",
        textShadowRadius: 10,
    },
    darkModeButton: {
        backgroundColor: Colors.red,
        borderRadius: 10,
        width: 75,
        height: "100%",
        marginLeft: 20,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        color: Colors.whiteForText,
    }
});

export default InspectionHeader;
