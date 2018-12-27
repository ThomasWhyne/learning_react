import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import './index.css';
import * as serviceWorker from './serviceWorker';

class Counter extends React.Component{
    render(){
        const { value, add, minus }=this.props;
        return(
            <div>
                <p>{ value }</p>
                <button onClick={ add }>+</button>
                <button onClick={ minus }>-</button>
            </div>
        )
    }
}

const CounterConnected=connect(
    ({ value })=>({
        value
    }),
    (dispatch)=>({
        add(){
            return dispatch({type:"ADD"})
        },
        minus(){
            return dispatch({type:"MINUS"})
        }
    })
)(Counter);

const Visibility=({ changeVisibility })=>(
    <div>
        <button onClick={() => changeVisibility(true) }>visible</button>
        <button onClick={() => changeVisibility(false)} >hidden</button>
    </div>
);

const VisibilityConnected=connect(
   null,
   (dispatch)=>({
        changeVisibility(visible){
            dispatch({
                type:CHANGE_VISIBILITY,
                visible
            })
        }
   })
)(Visibility);

const App=({ visible })=>(
    <div>
        <VisibilityConnected></VisibilityConnected>
        {visible && <CounterConnected></CounterConnected> }
    </div>
);
// action types which as value when being dispatched
const CHANGE_VISIBILITY="CHANGE";

const visibilityReducer=(state=true, action)=>{
    if(action.type === CHANGE_VISIBILITY ){
        return action.visible;
    }
    return state;
};

const counterReducer=(state=0, action)=>{
    switch (action.type) {
        case "ADD":
            return state+1;
        case "MINUS":
            return state-1;
        default:
            return state;
    }
}
//combine multiple reducers and name them
const rootReducer=combineReducers({
    visible:visibilityReducer,
    value:counterReducer
})

const store=createStore(rootReducer)

const AppConnected = connect(({ visible }) => ({ visible }))(App);

ReactDOM.render(<Provider store={ store }>
    <AppConnected></AppConnected>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
