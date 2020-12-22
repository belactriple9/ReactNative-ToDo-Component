import React from "react";
import { View, StyleSheet } from "react-native";

const Container = (props) => {

    return <View style={{...styles.containerStyle, ...props.style}}>{props.children}</View>

};

const styles = StyleSheet.create({
    
});

export default Container;