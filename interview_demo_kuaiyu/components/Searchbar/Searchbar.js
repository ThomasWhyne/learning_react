import React, { Component } from "react";
import "./Searchbar.css";

const Searchbar = ({ handleFocus }) => (
    <div className="searchbar">
        <input type="text" defaultValue="搜索" onFocus={ handleFocus } />
        <span className="searchbar-icon" >
            <svg className="icon" aria-hidden="true" style={{ fill: "#fff" }}>
                <use xlinkHref="#icon-search" />
            </svg>
        </span> 
    </div>
);

export default Searchbar;