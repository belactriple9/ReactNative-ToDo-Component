import React from 'react';
import { AsyncStorage } from 'react-native';

import ToDoList from "./screens/toDoList";

export default function App() {
  //AsyncStorage.clear()
  global.darkMode = false;


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

  return (
    <ToDoList />
  );
}
