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
import Colors from "../../constants/colors";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;


export default class TodoList extends Component {

    constructor(props) {
        super(props);
        //alert(JSON.stringify(this.props.idx));
    }

    state = {
        tasks: [],
        text: "",
        searchText: "",
    };

    changeTextHandler = text => {
        this.setState({ text: text });
    };


    getTask = i => {

        //console.log(this.state.tasks.slice()[i]);
        //return temp[i];
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
        setStyles()

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

    changeObjectText = () => {
        this.state.tasks[this.props.idx].text = this.state.text
        Tasks.save(this.state.tasks);
    }

    render() {
        return (
            <View
                style={[styles.container, { paddingBottom: this.state.viewMargin }]}
            >
                <View style={{ height: "90%" }}>
                    <Text>
                        We are in index {this.props.idx} deep info :O
                </Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.changeTextHandler}
                    onSubmitEditing={this.changeObjectText}//(text) => this.state.tasks[this.props.idx].text = text}
                    //value={this.state.text}
                    placeholder="Change Task Title"
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
            tasks ? tasks.map((task, i) => ({ key: i + "", text: task.text, draw: task.draw, searchDisplay: true, description: task.description })) : []
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
}

var styles = StyleSheet.create({
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