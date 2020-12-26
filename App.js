import React from 'react';
import { AsyncStorage } from 'react-native';

import ToDoList from "./screens/toDoList";

export default function App() {
  //AsyncStorage.clear()
  return (
    <ToDoList />
  );
}
