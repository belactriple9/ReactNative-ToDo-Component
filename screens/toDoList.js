import React, { useState, Component, window } from 'react';
import { StyleSheet } from "react-native";


import ToDoData from './toDoList/toDoData.js';
import ToDoHome from './toDoList/toDoHome.js';
import ToDoCompleted from './toDoList/toDoCompleted.js';
import ToDoFooter from "../components/ToDoFooter";
import ToDoHeadder from "../components/ToDoHeadder";
import Background from "../components/background";
import Container from "../components/container";
// import Colors from "../constants/colors";
var Colors = global.colors;

/**
 * A wrappper for the functionality of the todo-list
 * @param {Properties passed to ToDoList} props 
 */

const ToDoList = (props) => {
    Colors = global.colors;

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

    const [uniqueValue, setUniqueValue] = useState(0);

    const toggleDarkMode = () => {
        //make dark mode or light mode happen
        global.darkMode ?
            global.darkMode = false /*do thing*/ :
            global.darkMode = true; //swap back to light mode

        if (global.darkMode) {
            global.colors = { //this is dark mode
                darkYellow: "#ffffff",
                black: "#66dbf6",
                gold: "#808080",
                lightBlack: "#ffffff",
                Yellow: "#ffffff",
                red: "#3a3637",
                lightBlue: "#ffffff",
                darkBlue: "#00008b",
                iOSWhite: "#111111",
                whiteForText: "#efece3"
            }
        } else
            global.colors = { //this is light mode
                darkYellow: "#f3c622",
                black: "#23212c",
                gold: "#fcb438",
                lightBlack: "#3a3637",
                Yellow: "#fcd615",
                red: "#992409",
                lightBlue: "#66dbf6",
                darkBlue: "#0000FF",
                iOSWhite: "#efece3",
                whiteForText: "#efece3"
            }

        uniqueValue === 0 ? setUniqueValue(1) : setUniqueValue(0);

    };


    return (
        <Background key={uniqueValue} >
            <ToDoHeadder toggleDarkMode={toggleDarkMode} onPress={checkAndNavigatev2} />
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

