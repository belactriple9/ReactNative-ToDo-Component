import React, { Component } from "react";
import {
    TouchableWithoutFeedback,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    AsyncStorage,
    Button,
    TextInput,
    Keyboard,
    Platform,
    Alert
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

var properties;


export default class TodoList extends Component {
    //checkAndNavigate;

    constructor(props) {
        super(props);
        //alert(JSON.stringify(this))
    }

    state = {
        tasks: [],
        text: "",
    };

    changeTextHandler = text => {
        this.setState({ text: text });
    };

    addTask = () => {
        let notEmpty = this.state.text.trim().length > 0;

        if (notEmpty) {
            this.setState(
                prevState => {
                    let { tasks, text, draw } = prevState;

                    return {
                        tasks: tasks.concat({ key: tasks.length + "", text: text, draw: true }),
                        text: "",
                    };
                },

                () => {
                    Tasks.save(this.state.tasks)
                }
            );
        }
    };

    getTask = i => {

        var temp = this.state.tasks.slice();
        return temp[i];
    }

    deleteTask = async (i) => {


        asyncAlert = () => {
            return new Promise((resolve, reject) => {
                Alert.alert(
                    "",
                    "Would you like to delete or complete",
                    [
                        {
                            text: "Delete",
                            onPress: () => { resolve(true) },
                        },
                        {
                            text: "Complete",
                            onPress: () => { resolve(false) },
                        }
                    ],
                    { cancelable: false }
                );
            })
        }

        var shouldDelete = await asyncAlert();

        shouldDelete ?
            this.setState(
                prevState => {
                    let tasks = prevState.tasks.slice();

                    tasks.splice(i, 1);

                    return { tasks: tasks };
                },
                () => Tasks.save(this.state.tasks)
            )
            : //else
            this.setState(
                prevState => {
                    //let tasks = prevState.tasks.slice();
                    let { tasks, text, draw } = prevState;
                    tasks[i].draw = false
                    return { tasks: tasks };
                },
                () => { Tasks.save(this.state.tasks) }
            );
    };

    componentDidMount() {

        Keyboard.addListener(
            isAndroid ? "   boardDidShow" : "keyboardWillShow",
            e => this.setState({ viewMargin: e.endCoordinates.height + viewPadding })
        );

        Keyboard.addListener(
            isAndroid ? "keyboardDidHide" : "keyboardWillHide",
            () => this.setState({ viewMargin: viewPadding })
        );

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
                    renderItem={({ item, index }) => item.draw ? //null  // alert(JSON.stringify(item))
                        (<View>
                            <View style={styles.listItemCont}>
                                <TouchableHighlight onPress={() => { this.props.checkAndNavigate(index) }} style={styles.listItemCont}>
                                    <View style={{ width: "90%" }}>
                                        <Text style={styles.listItem}>
                                            {item.text}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                                <Button title="X" style={styles.button} onPress={() => this.deleteTask(index)} />
                            </View>
                            <View style={styles.hr} />
                        </View>)
                        : null
                    }
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.changeTextHandler}
                    onSubmitEditing={this.addTask}
                    value={this.state.text}
                    placeholder="Add Tasks"
                    returnKeyType="done"
                    returnKeyLabel="done"
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
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