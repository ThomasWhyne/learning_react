import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Head from "./components/Head";
import Body from "./components/Body";
import AppContext from "./contexts/AppContext";
import PropTypes from "prop-types";
// import { createStore } from "./redux/createStore";
// import { storeChange } from "./redux/storeChange"

class App extends Component {
    // static childContextTypes={
    //     store:PropTypes.object,
    //     dispatch: PropTypes.func,
    //     subscribe: PropTypes.func,
    //     getStore:PropTypes.func
    // }
    // state={
    //     head: "I am the head from context",
    //     body: "I am the body from context",
    //     headBtn: "change head",
    //     bodyBtn: "change body"
    // }
    changeHead=(message)=>{
        this.setState(state=>{
            return state.head!==message?{...state,head:message}:{...state};
        })
    }
    changeBody=(message)=>{
        console.log(message)
        this.setState({
            body:message
        },()=>{
            this.getChildContext()
        })
    }
    // getChildContext(){
    //     const { store, dispatch, subscribe, getStore }=createStore(undefined, storeChange);
    //     return { store, dispatch, subscribe, getStore };
    // }
  render() {
    return (
            <div className="App">
                <Head></Head>
                <Body></Body>
            </div>
    );
  }
}

export default App;
