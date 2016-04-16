/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var React = require('react-native')

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    AlertIOS,
    TouchableOpacity,
    } = React
var AddressBook = require('react-native-addressbook')
var _= require('lodash')
const insta = React.createClass({
    showAlert: function(){
        var me = this
        AlertIOS.alert(
            '"Dare U would like to get your contacts"',
            "We will use your contacts to help you connect with your friends easily. ",
            [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Find my friends',
                    onPress: ()=>me.syncContacts((contacts)=>{
                        console.log("I am the callback", contacts)
                    })
                }
            ]
        );
    },
    syncContacts: function (callback) {
        var me = this;
        /**
         * hit http
         */
        AddressBook.getContacts(function (error, contacts) {
            if (error) {
                if (error.type === "permissionDenied") {
                    if (callback) {
                        callback(false)
                    }
                }
            } else {
                // prepare contacts (only with phoneNumbers)
                contacts = _.filter(contacts, function (contact) {
                    return !_.isEmpty(contact.phoneNumbers)
                });
                if(callback){
                    callback(contacts)
                }
            }
        })
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <View style={styles.left_icon}>
                        <Text>
                            ≥
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", backgroundColor: "yellow"}}>
                        <Text style={{fontWeight: "bold"}}>
                            InstaWork
                        </Text>
                    </View>
                    <TouchableOpacity onPress={this.showAlert} style={styles.right_icon}>
                        <Text>
                            Map
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{justifyContent: "center", flex:10, alignItems: "center"}}>
                    <Text style={styles.welcome}>
                        Welcome to InstaWork!
                    </Text>
                    <Text style={styles.instructions}>
                        To get started, edit index.ios.js
                    </Text>
                    <Text style={styles.instructions}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ___{'\n'}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '-||__/__________
                        {'\n'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |==/|_|_|_|_|_/
                        {'\n'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |=/_|_|_|_|_|/
                        {'\n'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |/|_|_|_|_|_/
                        {'\n'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |_|_|_|_|_|/
                        {'\n'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )_____(_
                        {'\n'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; jgs&nbsp; [--------|
                        {'\n'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (o)""""(o)
                    </Text>
                </View>
            </View>
        );
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    left_icon: {
        flex: 0.5,
        paddingLeft: 10,
    },
    right_icon: {
        flex: 0.5,
        paddingRight: 10,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    icon: {
        width: 24,
        height: 16,
        backgroundColor: "transparent",
        alignSelf: "center",
        resizeMode: "contain"
    },
    topBar: {
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: "row",
        alignSelf: "stretch",
        backgroundColor: "yellow"
    },
});

AppRegistry.registerComponent('insta', () => insta);
