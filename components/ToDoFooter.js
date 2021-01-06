import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

import ColorsConst from '../constants/colors';
var Colors = ColorsConst;



const InspectionFooter = (props) => {
    Colors = global.colors;
    setStyles()
    return (

        <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={props.onPressBack}>
                <View>
                    <Text style={styles.text}>
                        {"<"} List
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.onPressNext}>
                <View>
                    <Text style={styles.text}>Completed {">"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

};

function setStyles() {
    styles = StyleSheet.create({
        footer: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignSelf: "center",
            maxWidth: 600,
            width: "100%",
            height: "7%",
            position: "absolute",
            bottom: "0.5%",
        },
        text: {
            color: Colors.whiteForText,
            fontSize: 22,
            fontWeight: "bold",
            alignSelf: "center",
            textShadowRadius: 10,
            textShadowColor: Colors.black,
        },
        button: {
            backgroundColor: Colors.darkBlue,
            width: "48%",
            height: "100%",
            borderRadius: 10,
            justifyContent: "center",
            alignSelf: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.26,
            elevation: 8,
        },

    });
}

var styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignSelf: "center",
        maxWidth: 600,
        width: "100%",
        height: "7%",
        position: "absolute",
        bottom: "0.5%",
    },
    text: {
        color: Colors.whiteForText,
        fontSize: 22,
        fontWeight: "bold",
        alignSelf: "center",
        textShadowRadius: 10,
        textShadowColor: Colors.black,
    },
    button: {
        backgroundColor: Colors.darkBlue,
        width: "48%",
        height: "100%",
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
    },

});

export default InspectionFooter;
