import React from 'react';
import { StyleSheet } from "react-native";

import ToDoHome from './toDoList/toDoHome.js';

import ToDoFooter from "../components/ToDoFooter";
import ToDoHeadder from "../components/ToDoHeadder";
import Background from "../components/background";
import Container from "../components/container";

/**
 * A wrappper for the functionality of the todo-list
 * @param {Properties passed to ToDoList} props 
 */
const ToDoList = (props) => {

    return (
        <Background>
            <ToDoHeadder />
            <Container style={styles.pageContainer}>
                <ToDoHome />
            </Container>
            <ToDoFooter style={styles.footerContainer} />
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
        height: "75%",
        top: "17%",
    },
    footerContainer: {
        flex: 1,
    }
});



export default ToDoList;

