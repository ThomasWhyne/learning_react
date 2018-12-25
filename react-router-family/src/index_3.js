import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Prompt, Switch } from "react-router-dom";
import './index.css';

function AmbiguousExample(){
    return(
        <Router>
            <div>
                <ul>
                    <li>
                        <Link  to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/kim">Kim</Link>
                    </li>
                    <li>
                        <Link to="/chris" >Chris</Link>
                    </li>
                    <li>
                        <Link to="/company">Company</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/company" component={Company} />
                    <Route path="/:user" component={User} />
                </Switch>
            </div>
        </Router>
    );
}

const About=()=><h2>About</h2>;
const Company=()=><h2>Company</h2>;
const User=({match})=><h2>{match.params.user}</h2>;

ReactDOM.render(<AmbiguousExample />, document.getElementById("root"));