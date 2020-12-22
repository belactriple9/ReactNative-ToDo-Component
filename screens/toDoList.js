import React from 'react';
import { StyleSheet } from "react-native";

import ToDoHome from './toDoList/toDoHome.js';


import Background from "../components/background";
import Container from "../components/container";

/**
 * A wrappper for the functionality of the todo-list
 * @param {Properties passed to ToDoList} props 
 */
const ToDoList = (props) => {

    return (
        <Background>
            <Container style={styles.pageContainer}>
                <ToDoHome />
            </Container>
        </Background>
    );

}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        position: 'absolute',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'stretch',
        alignSelf: "center",
        width: "100%",
        height: "98%",
        paddingTop: "6%",
    },
});

/**
 * 
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        padding: viewPadding,
        paddingTop: 20
 */

export default ToDoList;

