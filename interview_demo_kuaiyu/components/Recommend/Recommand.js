import React, { Component } from "react";
import "./Recommand.css";

const UNSTARED ="#icon-shoucang";
const STARED ="#icon-pingfen";

const IMG ="http://pic2.nipic.com/20090414/2233832_233559094_2.jpg";
const Star=(current)=>{
    return new Array(5).fill(STARED, 0, current).fill(UNSTARED,current);
};

export default class Recommand extends Component{
    constructor(props){
        super(props);
        this.state={
            stores:[
                { name:"奇点餐厅",url:"#",address:"深水渉区新世纪广场" },
                { name: "怡家餐厅", url: "#", address: "深水渉区新世纪广场" },
                { name: "日式餐厅", url: "#", address: "深水渉区新世纪广场" }

            ],
            collected:[0],
            stars:{ "name":{ "previous":0,"current":0 } }
        }

        

        
    }

    componentWillMount(){
        // 构建五星点赞， 以商店名为键构建哈希表，值为嵌套表:previous,current ---> 过去评分及当前评分
        const { floor, random } = Math;
        const stars = this.state.stores.reduce((ac, cu, index) => ({ ...ac, [cu.name]: { buffer: Star(floor(random() * 5)) } }), {});
        this.setState({
            stars
        })
    }

    componentDidMount(){
        this.setState(
            (prev)=>({
                ...prev,
                stores:prev.stores.map(item=>({ ...item,url:IMG }))
            })
        );
    }

    handleCollect(index) {
        let { collected }=this.state;
        const position=collected.indexOf(index);
        if(position>=0){
            collected=collected.filter(item=>item!==index);
        }else{
            collected.push(index);
        }
        this.setState({
            collected
        })
    }

    handleStar(name,index){
        const { stars }=this.state;
        const flag=stars[name].buffer[index]===UNSTARED?false:true;
        let newBuffer;
        if(flag){
            // when clicked one was stared,reverse it
            newBuffer = stars[name].buffer.map((item, starIndex) => starIndex>index?UNSTARED:starIndex<index?item:UNSTARED);
        }else{
            newBuffer = stars[name].buffer.map((item, starIndex) => starIndex<index?STARED:starIndex>index?item:STARED);
        }
        stars[name].buffer=newBuffer;
        this.setState({
            stars
        })
    }


    render(){
        const { stars }=this.state;
        console.log(stars)
        const stores=this.state.stores.map((item,index)=>(
            <div className="recommend-main__item"  key={ index }>
                <span className="__poster">
                    <img src={ item.url } alt=""/>
                </span>
                <span className="__information">
                    <svg className="icon" aria-hidden="true" style={ {fill:"brown"} } onClick={ ()=>this.handleCollect(index) } >
                        <use xlinkHref={this.state.collected.some((ele) => ele === index) ? "#icon-icon_favorite" : "#icon-shoucang2" } />
                    </svg>
                    <p>{ item.name }</p>
                    <p>{ item.address }</p>
                </span>
                <span className="__star" >
                    { stars[item.name].buffer.map((star,starIndex) => (
                        <svg className="icon" aria-hidden="true" style={{ fill:`${star===UNSTARED?"grey":"brown"}` }} onClick={() => this.handleStar(item.name,starIndex)} >
                            <use xlinkHref={ STARED } />
                        </svg>
                    )) }
                </span>
            </div>
        ));
        return(
            <div className="recommend" >
                <div className="recommend-title">推荐商家</div>
                <div className="recommend-main">
                { stores }
                </div>
            </div>
        );
    }
}