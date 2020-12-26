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

    const [index, setIndex] = useState(0);
    //set default to the toDoHome
    const [page, setPage] = useState(1);

    const checkAndNavigate = (i) => {
        //alert(i);
        if (!(i === null)) {
            //alert("nav1 " + index);
            setPage(3); //navigate to the internal
            setIndex(i);
            alert(index)
            setToDoList(toDoData);

        }
        else {
            //alert("nav2")
            setPage(1);
            setToDoList(toDoHome);
        }
    }

    let toDoHome = <ToDoHome
        checkAndNavigate={checkAndNavigate}
    />

    let toDoCompleted = <ToDoCompleted
    />

    let toDoData = <ToDoData
        {...{ index }}
    />

    const [toDoList, setToDoList] = useState(toDoHome);



    const toCompleted = () => {
        if (page === 1) {
            setPage(2)
            setToDoList(toDoCompleted)
        }

    }
    const toList = () => {
        if (page === 2) {
            setPage(1)
            setToDoList(toDoHome)
        }
    }



    return (
        <Background>
            <ToDoHeadder onPress={checkAndNavigate} />
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

