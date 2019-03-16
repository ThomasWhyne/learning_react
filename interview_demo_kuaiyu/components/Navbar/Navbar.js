import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "./Navbar.css";
import { red } from "ansi-colors";

export default class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={
            clicked:0,
            navList: [
                { path: "/", before: "#icon-people", after: "#icon-peoplefill" },
                { path: "/nearby", before: "#icon-location", after: "#icon-locationfill" },
                { path: "/menu", before: "#icon-edit", after: "#icon-edit" },
                { path: "/user", before: "#icon-people", after: "#icon-peoplefill" }]
        }
    }
    navTo(index){
        index!==this.state.index && this.setState({clicked:index});
    }
    render(){
        const { clicked }=this.state;
        const navTabs=this.state.navList.map((item,index)=>(
                <span className="nav-tab__item" key={ index } onClick={(e) => this.navTo(index)}> 
                    <NavLink to={ item.path }>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={ index === clicked ? item.after : item.before }/>
                        </svg>  
                    </NavLink>
                </span>
            ));

        return(
            <div className="nav-tab" >
                    { navTabs }
            </div>
        );
    }
}