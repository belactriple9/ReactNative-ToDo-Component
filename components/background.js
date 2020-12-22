import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../constants/colors";

const Background = (props) => {

    return <View style={styles.background}>{props.children}</View>

};

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.gold,
        width: "100%",
        height: "100%",
    },
});

export default Background;
