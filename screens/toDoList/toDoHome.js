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
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import ColorsConst from '../../constants/colors'
var Colors = ColorsConst;


const isAndroid = Platform.OS == "android";
const viewPadding = 10;


export default class TodoList extends Component {

    constructor(props) {
        super(props);
        //alert(JSON.stringify(this))
    }

    state = {
        tasks: [],
        text: "",
        searchText: "",
    };

    searchHandler = text => {
        this.setState({ searchText: text })
        // alert(this.state.searchText.toString());
        for (var i = 0; i < this.state.tasks.length; i++) {
            if (!(this.state.tasks[i].text.includes(this.state.searchText)) && !(this.state.searchText.toString() === "")) {
                this.state.tasks[i].searchDisplay = false;
            } else {
                this.state.tasks[i].searchDisplay = true;
            }
        }
    };

    reloadSearch = () => {
        this.setState({ searchText: "" })
        for (var i = 0; i < this.state.tasks.length; i++) {
            this.state.tasks[i].searchDisplay = true;
        }
    }

    changeTextHandler = text => {
        this.setState({ text: text });
    };

    addTask = () => {
        this.reloadSearch();
        let notEmpty = this.state.text.trim().length > 0;

        if (notEmpty) {
            this.setState(
                prevState => {
                    let { tasks, text, searchText } = prevState;

                    return {
                        tasks: tasks.concat({ key: tasks.length + "", text: text, draw: true, searchDisplay: true }), //always on a new add, make sure it draws
                        text: "",
                        searchText: searchText,
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
                    let { tasks } = prevState;
                    tasks[i].draw = false
                    return { tasks: tasks };
                },
                () => { Tasks.save(this.state.tasks) }
            );
    };

    componentDidMount() {
        setStyles()


        Keyboard.addListener(
            isAndroid ? "   boardDidShow" : "keyboardWillShow", //literally the spaces before boardDidShow is 100% required
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
                <View style={{ flexDirection: "row", }}>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={this.searchHandler}
                        onSubmitEditing={this.searchHandler}
                        value={this.state.searchText}
                        placeholder="Search Tasks"
                        returnKeyType="done"
                        returnKeyLabel="done"
                    >
                    </TextInput>

                    <TouchableOpacity style={styles.buttonReload} text="Reload" onPress={this.reloadSearch}>
                        <View style={styles.reloadButton}>
                            <Text style={styles.ItemTextStyle}>
                                Reload
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.list}
                    data={this.state.tasks}
                    renderItem={({ item, index }) => item.draw && item.searchDisplay ? //null  // alert(JSON.stringify(item))
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
            tasks ? tasks.map((task, i) => ({ key: i + "", text: task.text, draw: task.draw, searchDisplay: true })) : []
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
        textInput: {
            height: 40,
            paddingRight: 10,
            paddingLeft: 10,
            borderColor: Colors.lightBlack,
            borderWidth: isAndroid ? 0 : 1,
            width: "100%",
            color: Colors.black,
        },
        searchInput: {
            marginRight: "auto",
            flexDirection: "row",
            justifyContent: "flex-start",
            height: 40,
            paddingRight: 10,
            paddingLeft: 10,
            borderColor: Colors.lightBlack,
            borderWidth: isAndroid ? 0 : 1,
            width: "80%",
            color: Colors.black
        },
        button: {
            flex: 1,
        },
        buttonReload: {
            flex: 1,
            flexDirection: "row",

        },
        ItemTextStyle: {
            color: Colors.iOSWhite, justifyContent: "center", padding: "3%", textShadowColor: global.darkMode ? Colors.black : Colors.iOSWhite,
            textShadowRadius: 10,
        },
        reloadButton: { backgroundColor: Colors.red },
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
        backgroundColor: Colors.lightBlack
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
    searchInput: {
        marginRight: "auto",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "gray",
        borderWidth: isAndroid ? 0 : 1,
        width: "80%"
    },
    button: {
        flex: 1,
    },
    buttonReload: {
        flex: 1,
        flexDirection: "row",
    },
    ItemTextStyle: { color: Colors.iOSWhite, justifyContent: "center", padding: "3%" },
    reloadButton: { backgroundColor: Colors.darkBlue },
});