/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';

import {Header} from "./src/components/common";
import LoginForm from "./src/components/LoginForm";

export default class App extends Component<Props> {

    initializeFirebase() {
        firebase = require("firebase");
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCT0zNcnU_nMmd2ZvjAkzhCkfAkvXb4FUU",
            authDomain: "my-society-app.firebaseapp.com",
            databaseURL: "https://my-society-app.firebaseio.com",
            projectId: "my-society-app",
            storageBucket: "my-society-app.appspot.com",
            messagingSenderId: "56805290687"
        };
        firebase.initializeApp(config);
    }

    componentWillMount() {
        this.initializeFirebase();
    }

    render() {
        return (
            <View>
                <Header headerText={'Login'}/>
                <LoginForm/>
            </View>
        );
    }


}
