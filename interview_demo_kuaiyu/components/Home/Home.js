import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar.js";
import Banner from "../Banner/Banner.js";
import Category from "../Category/Category.js";
import Recommend from "../Recommend/Recommand.js";
import News from "../News/News.js"
import "./Home.css";
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            currentLocation:"铜锣湾",
            banners:new Array(3).fill("#"),
            categories:"西餐-快餐简食-日韩料理-地方菜系-面食粥点-甜品饮品-小吃-茶餐厅-全部".split("-"),
            news:[
                {
                    title:"短暂高强度的健身效果一样",
                    content:"在一项2016年的科学研究中，科学家找来了一群男人完成了三组全面的健身动作，每组持续时长20秒，并且包含了热身、渐渐停止和休息环节。研究的结果显示参与这项实验的志愿者的身体指标有了一定的改善，并且这种改善的幅度与进行了45分钟较低强度健身的人相同",
                    num:1200,
                    time:"1小时前",
                    url:"https://tse4-mm.cn.bing.net/th?id=OIP.8oe2dNxTUvzUEO_dB1x2EwHaFX&w=250&h=178&c=7&o=5&dpr=1.25&pid=1.7"
                },
                {
                    title: "短暂高强度的健身效果一样",
                    content: "在一项2016年的科学研究中，科学家找来了一群男人完成了三组全面的健身动作，每组持续时长20秒，并且包含了热身、渐渐停止和休息环节。研究的结果显示参与这项实验的志愿者的身体指标有了一定的改善，并且这种改善的幅度与进行了45分钟较低强度健身的人相同",
                    num: 1200,
                    time: "1小时前",
                    url: "https://tse4-mm.cn.bing.net/th?id=OIP.8oe2dNxTUvzUEO_dB1x2EwHaFX&w=250&h=178&c=7&o=5&dpr=1.25&pid=1.7"
                },
                {
                    title: "短暂高强度的健身效果一样    ",
                    content: "在一项2016年的科学研究中，科学家找来了一群男人完成了三组全面的健身动作，每组持续时长20秒，并且包含了热身、渐渐停止和休息环节。研究的结果显示参与这项实验的志愿者的身体指标有了一定的改善，并且这种改善的幅度与进行了45分钟较低强度健身的人相同",
                    num: 1200,
                    time: "1小时前",
                    url: "https://tse4-mm.cn.bing.net/th?id=OIP.8oe2dNxTUvzUEO_dB1x2EwHaFX&w=250&h=178&c=7&o=5&dpr=1.25&pid=1.7"
                },
            ]
        }
    }
    componentDidMount(){
        const timer=setTimeout(()=>this.setState({
            banners: ["http://img1.3lian.com/2015/a2/234/d/5.jpg", "http://img1.3lian.com/2015/a2/234/d/8.jpg", "http://img1.3lian.com/2015/a2/234/d/5.jpg"]
        }),2500)
        this.setState({
            timer
        })
    }

    componentWillUnmount(){
        clearTimeout(this.state.timer);
    }

    handleFocus(e){
        e.target.select();
    }
    
    render(){
        return(
            <div className="home">
                <section className="home-location">
                    <span>
                        <svg className="icon" aria-hidden="true" style={ { fill:"#000" } }>
                            <use xlinkHref="#icon-location" />
                        </svg> 
                    </span>
                    <span>
                        { this.state.currentLocation }
                    </span>
                </section>
                <section className="home-searchbar">
                    < Searchbar handleFocus={ (e)=>this.handleFocus(e) } / >
                </section>
                <section className="home-banner" >
                    < Banner  banners={ this.state.banners } />
                </section>
                <section className="home-category">
                    <Category categories={ this.state.categories } />
                </section>
                <section className="home-recommend">
                    <Recommend/>
                </section>
                <section className="home-news"> 
                    <News news={ this.state.news } />
                </section>
            </div>
        );
    }
}