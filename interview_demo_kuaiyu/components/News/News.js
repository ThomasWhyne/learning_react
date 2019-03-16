import React, { Component } from "react";
import "./News.css";

const News=({ news })=>(
    <div className="news">
        <div className="news-title">最新资讯</div>
        <div className="news-content">
            { news.map(item=>(
                <div className="news-content__item">
                    <div className="news__item-detail">
                        <div className="__item-deail__hd">
                            { item.title }
                        </div>
                        <div className="__item-detial__bd">
                            { item.content }
                        </div>
                        <div className="__item-detial__view">
                            <svg className="icon" aria-hidden="true" style={{ fill: "brown" }} onClick={() => this.handleCollect(index)} >
                                <use xlinkHref="#icon-shoucang1" />
                            </svg>
                            <span>{ item.num }</span>
                            <span> { item.time } </span>
                        </div>
                    </div>
                    <div className="news__item-illustrator">
                        <img src={ item.url } alt=""/>
                    </div>
                </div>
            )) }
        </div>
    </div>
);

export default News;