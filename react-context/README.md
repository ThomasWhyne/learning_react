- #### simple redux
so  this is the case, there are two primary thing s that matters greatly here:  
- first ---> the store that you created:    
    > if you had a peep on original `createStore` function in `redux`, you would notice that it takes three aruguments: reducer, preloadedState, and enhacer. reducer is the exactly pure  function that you created which receives state and action 
```javascript
```

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Head from "./components/Head";
import Body from "./components/Body";
import AppContext from "./contexts/AppContext";
import PropTypes from "prop-types";
class App extends Component {
    static childContextTypes={
        store:PropTypes.object,
        changeHead: PropTypes.func,
        changeBody: PropTypes.func
    }
    state={
        head: "I am the head from context",
        body: "I am the body from context",
        headBtn: "change head",
        bodyBtn: "change body"
    }
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
    getChildContext(){
        const store=this.state;
        const methods={
            changeBody:this.changeBody,
            changeHead:this.changeHead
        }
        return { store, changeBody:this.changeBody, changeHead:this.changeHead }
    }
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

```  
  
```javascript
import React from "react";
import PropTypes from "prop-types";

export default class Head extends React.Component {
    static contextTypes={
        store:PropTypes.object
    }
    componentWillMount=()=>{
       
    }
    render() {
        return(
            <div className="head">{ this.context.store.head }</div>
        );
    }
}
```  
  
```javascript

import React from "react";
import PropTypes from "prop-types";

import AppContext from "../contexts/AppContext";

export default class Button extends React.Component {
    static contextTypes={
        store:PropTypes.object,
        changeHead:PropTypes.func,
        changeBody:PropTypes.func
    }
    componentWillMount(){
        const { headBtn, bodyBtn }=this.context.store;
        this.setState({
            headBtn,
            bodyBtn
        })
    }
    render() {
        const { changeHead, changeBody } = this.context;
        return(
            <div className="button">
                <div className="btn" onClick={ ()=>changeHead("I am the head changed by Button") }>{ this.state.headBtn }</div>
                <div className="btn" onClick={() => changeBody("I am the head changed by Button") }>{ this.state.bodyBtn }</div>
            </div>
        );
    }
}

```