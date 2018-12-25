import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

function BasicExample(){
    return(
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
                <hr/>
                <Route exact path="/" component={ Home }></Route>
                <Route  path="/about" component={About}></Route>
                <Route  path="/topics" component={Topics}></Route>
            </div>
        </Router>
    );
}

function Home(){
    return(
        <h2>Home</h2>
    );
}

function About() {
    return (
        <h2>About</h2>
    );
}

function Topics({ match }){
    return(
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>Components in React</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props And State</Link>
                </li>
            </ul>
            <Route path={`${match.url}/:topicId`} component={ Topic }></Route>
            <Route path={`${match.url}`} render={()=><h3>Please select a</h3> }></Route>
        </div>
    );
}

function Topic({match}){
    return(
        <div>
            { match.params.topicId }
        </div>
    );
}

ReactDOM.render(<BasicExample/>,document.getElementById("root"));