import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

import Colors from "../constants/colors";

const InspectionHeader = (props) => {

    return <View style={styles.pageHeader}>
        <TouchableOpacity>
            <View style={styles.discardButton}>
                <Text style = {styles.btnText}>Discard</Text>
            </View>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Inspection</Text>
    </View>

};

const styles = StyleSheet.create({
    pageHeader: {
        marginTop: 50,
        flexDirection: "row",
        maxWidth: 500,
        width: "100%",
        height: 80,
        alignSelf: "center",
    },
    pageTitle: {
        color: Colors.lightBlack,
        marginLeft: "7%",
        fontSize: 32,
        fontWeight: "bold",
        alignSelf: "center",
    },
    discardButton: {
        backgroundColor: Colors.red,
        borderRadius: 10,
        width: 155,
        height: "100%",
        marginLeft: 20,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {width:0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        color: Colors.iOSWhite,
    },
    btnText: {
      color: Colors.iOSWhite,
      fontWeight: 'bold',
      fontSize: 20,
      textShadowColor: "black",
      textShadowRadius: 10,
    }
});

export default InspectionHeader;
