import React, { Component } from "react";
import "./Category.css";

const Category=({categories})=>(
    <div className="category">
        <div className="category-title">精选分类</div>
        <div className="category-main">
            {categories.map((item, index) => (
                <span key={index} >{item}</span>
            ))}
        </div>
    </div>
);

export default Category;