import React from "react";
import { View, StyleSheet } from "react-native";
import ColorsConst from '../constants/colors'
var Colors = ColorsConst;


const Background = (props) => {
    setStyles();
    return <View style={styles.background}>{props.children}</View>

};

function setStyles() {
    Colors = global.colors;
    styles = StyleSheet.create({
        background: {
            backgroundColor: Colors.gold,
            width: "100%",
            height: "100%",
        },
    });
}

var styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.gold,
        width: "100%",
        height: "100%",
    },
});

export default Background;
