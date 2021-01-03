import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    AsyncStorage,
    Button,
    TextInput,
    Keyboard,
    Platform
} from "react-native";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

import ColorsConst from '../../constants/colors';
var Colors = ColorsConst;


export default class TodoList extends Component {


    state = {
        tasks: [],
        text: "",
    };


    changeTextHandler = text => {
        this.setState({ text: text });
    };


    deleteTask = i => {
        this.setState(
            prevState => {
                let tasks = prevState.tasks.slice();

                tasks.splice(i, 1);

                return { tasks: tasks };
            },
            () => Tasks.save(this.state.tasks)
        );
    };

    componentDidMount() {
        setStyles()
        Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
    }

    render() {
        return (
            <View
                style={[styles.container, { paddingBottom: this.state.viewMargin }]}
            >
                <FlatList
                    style={styles.list}
                    data={this.state.tasks}
                    renderItem={({ item, index }) => !item.draw ?
                        (<View>
                            <View style={styles.listItemCont}>
                                <Text style={styles.listItem}>
                                    {item.text}
                                </Text>
                                <Button title="X" style={styles.button} onPress={() => this.deleteTask(index)} />
                            </View>
                            <View style={styles.hr} />
                        </View>)
                        : null}
                />
            </View>
        );
    }
}

/**
 * Change Async storage to SQL queries
 */
let Tasks = {
    convertToArrayOfObject(tasks, callback) {
        tasks = JSON.parse(tasks);

        return callback(
            tasks ? tasks.map((task, i) => ({ key: i + "", text: task.text, draw: task.draw })) : []
        );
    },
    convertToStringWithSeparators(tasks) {
        return JSON.stringify(tasks);
    },
    all(callback) {
        return AsyncStorage.getItem("TASKS", (err, tasks) =>
            this.convertToArrayOfObject(tasks, callback)
        );
    },
    save(tasks) {
        AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
    },

};

function setStyles() {
    Colors = global.colors;
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.iOSWhite,
            padding: viewPadding,
            paddingTop: 20
        },
        list: {
            width: "100%"
        },
        listItem: {
            paddingTop: 2,
            paddingBottom: 2,
            width: '90%',
            fontSize: 18,
            color: Colors.black,
        },
        hr: {
            height: 1,
            backgroundColor: Colors.lightBlack
        },
        listItemCont: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        button: {
            flex: 1,
        }
    });
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.iOSWhite,
        padding: viewPadding,
        paddingTop: 20
    },
    list: {
        width: "100%"
    },
    listItem: {
        paddingTop: 2,
        paddingBottom: 2,
        width: '90%',
        fontSize: 18
    },
    hr: {
        height: 1,
        backgroundColor: "gray"
    },
    listItemCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textInput: {
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "gray",
        borderWidth: isAndroid ? 0 : 1,
        width: "100%"
    },
    button: {
        flex: 1,
    }
});