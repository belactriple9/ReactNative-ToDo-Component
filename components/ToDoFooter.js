import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

import Colors from "../constants/colors";

const InspectionFooter = (props) => {

    return (
        !props.backIsDisabled ?
            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={props.onPressBack} disabled={props.backIsDisabled}>
                    <View>
                        <Text style={styles.backText}>
                            {"<"} {(props.useEditButton ? "Back" : "Edit")}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={props.onPressNext}>
                    <View>
                        <Text style={styles.nextText}>Next {">"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            :
            <View style={styles.footer}>
                <TouchableOpacity style={styles.nextButton} onPress={props.onPressNext}>
                    <View>
                        <Text style={styles.nextText}>Next {">"}</Text>
                    </View>
                </TouchableOpacity>
            </View>)

};

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignSelf: "center",
        maxWidth: 600,
        width: "100%",
        height: 90,
    },
    backButton: {
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
    backText: {
        color: Colors.iOSWhite,
        fontSize: 22,
        fontWeight: "bold",
        alignSelf: "center",
        textShadowRadius: 10,
        textShadowColor: Colors.black,
    },
    nextButton: {
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
    nextText: {
        color: Colors.iOSWhite,
        fontSize: 22,
        fontWeight: "bold",
        alignSelf: "center",
        textShadowRadius: 10,
        textShadowColor: Colors.black,
    },
});

export default InspectionFooter;
