import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

function PreventingTransitionExample(){
    return(
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Form</Link>
                    </li>
                    <li>
                        <Link to="/one">One</Link>
                    </li>
                    <li>
                        <Link to="/two">Two</Link>
                    </li>
                </ul>
                <Route path="/" exact component={Form}></Route>
                <Route path="/one" exact component={One}></Route>
                <Route path="/two" exact component={Two}></Route>
            </div>
        </Router>
    );
}

const One=()=>{
    return(
        <div>One</div>
    );
}

const Two=()=>{
    return(
        <div>Two</div>
    );
}

class Form extends React.Component{
    state={
        isBlocking:false
    }
    componentWillUnmount(){
        console.log("Form will unmount")
    }
    render(){
        return(
            <form onSubmit={ event=>{ event.preventDefault();event.target.reset(); } }>
                <Prompt when={ this.state.isBlocking } message={ location=>`Are you sure you want to go to ${ location.pathname}` }></Prompt>
                <p>
                    <input type="text" size="50" placeholder="type somthing to broke transitions" onChange={ event=>{ this.setState({isBlocking:event.target.value.trim().length>0}) } }/>
                </p>
                <p>
                    <button type="submit">Submit to stop blocking</button>
                </p>
            </form>
        );
    }
}

ReactDOM.render(<PreventingTransitionExample />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
