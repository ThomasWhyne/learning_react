- #### simple redux
so  this is the case, there are two primary thing s that matters greatly here:  
- first ---> the store that you created:    
    > if you had a peep on original `createStore` function in `redux`, you would notice that it takes three aruguments: reducer, preloadedState, and enhacer. reducer is the exact pure  function that you created which receives state and action .Once the reducer was sent in, it will be called in order to get the initial state which will be saved as so called `currentState`,this is what you get from invoking `getState` returned by `createStore`.  
- second ---> the action that you dispatched  
>Actually, what `createStore` returns is not solely getState. In fact it bundles all the methods into an object which  you might be in need of in different views. The dispatch method surely was included. With dispatch involved, views are capable of dispatching actions to the `reducer`,when `reducer` was called with different actions ,it returns new state accordingly, which will once again saved as `currentState`.   

  so now you have a centeral hub to store states, and a dispatch method to change the state...that seems perfect, but wait a  second, how was the store provied to views, and how did views know that the state in the store was changed?  
  The `redux` was deployed because  chaining data flow passed level by level through componnets is hard to trace and takes a high chance to make you grogramm difficult to maintain. so state--->props--->state...by no means makes sense.  
  what if we have a general provider makes general state accessible to all the components ,dispite of what floors they live. This is a good idead. In addition, making a bridge that could be applied in use is totally reasonable, beacause not all the components want to know what has happened to to the store, some of them just simply don't need it.

Here is how it goes.
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