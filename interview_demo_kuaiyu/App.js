import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink,Switch,Redirect } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

const Todo=()=>(
    <div style={ { width:"100vw",height:"100vh",textAlign:"center",lineHeight:"100vh" } }>to be continued...</div>
);

export default class App extends Component{
    render(){
        return(
            <Router>
                <div className="app">
                    <section className="page-container">
                        < AnimatedSwitch atEnter={{ opacity: 0 }}
                                         atLeave={{ opacity: 0 }}
                                         atActive={{ opacity: 1 }}
                                         className="switch-wrapper">
                            <Route exact path="/" component={Home}  />
                            <Route path="/nearby" component={Todo}  />
                            <Route path="/menu" component={Todo} />
                            <Route path="/user" component={Todo} />
                        </ AnimatedSwitch>
                    </section>
                    <section className="navbar">
                        <Navbar/>
                    </section>
                </div>
            </Router>
        );
    }
}