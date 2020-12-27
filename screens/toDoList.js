import React, { useState } from 'react';
import { StyleSheet } from "react-native";

import ToDoData from './toDoList/toDoData.js';
import ToDoHome from './toDoList/toDoHome.js';
import ToDoCompleted from './toDoList/toDoCompleted.js';
import ToDoFooter from "../components/ToDoFooter";
import ToDoHeadder from "../components/ToDoHeadder";
import Background from "../components/background";
import Container from "../components/container";

/**
 * A wrappper for the functionality of the todo-list
 * @param {Properties passed to ToDoList} props 
 */
const ToDoList = (props) => {

    //set default to the toDoHome
    const [page, setPage] = useState(2);

    const checkAndNavigate = (i) => {
        setPage(3); //navigate to the internal
        setToDoList(toDoData(i));
    }

    const checkAndNavigatev2 = () => {
        setPage(1);
        setToDoList(toDoHome);
    }

    let toDoHome = <ToDoHome
        checkAndNavigate={checkAndNavigate}
    />

    let toDoCompleted = <ToDoCompleted
    />

    let toDoData = (i) => {
        return (<ToDoData
            idx={i}
        />)
    }

    const [toDoList, setToDoList] = useState(toDoHome);



    const toCompleted = () => {
        setPage(2)
        setToDoList(toDoCompleted)

    }
    const toList = () => {
        setPage(1)
        setToDoList(toDoHome)
    }



    return (
        <Background>
            <ToDoHeadder onPress={checkAndNavigatev2} />
            <Container style={styles.pageContainer}>
                {toDoList}
            </Container>
            <ToDoFooter onPressNext={toCompleted} onPressBack={toList} style={styles.footerContainer} />
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

