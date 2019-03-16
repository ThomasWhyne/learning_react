import React, { Component } from "react";
import "./Banner.css";
import { start } from "pretty-error";

const defaultTransform = "translateX(0)";

export default class Banner extends Component{
    constructor(props){
        super(props);
        this.state={
            banners:this.props.banners,
            touchStart:0,
            shift:0,
            transform: defaultTransform,
            show:false
        }
    }

    componentWillReceiveProps({banners}){
        this.setState({
            banners
        })
    }

    onTouchStart({ touches }){
        const { clientX }=touches[0];
        this.setState({
            touchStart:clientX,
        });
    }

    onTouchMove({ touches,currentTarget }){
        const { offsetWidth }=currentTarget;
        const { clientX }=touches[0];
        let { touchStart,shift }=this.state;
        let diff =(clientX - touchStart);
        if (Math.abs(shift + diff) <= offsetWidth / 2){
            shift = shift + diff;
            this.setState({
                transform: `translateX(${shift}px)`,
                touchStart: clientX,
                shift: shift
            })
        }
    }
    render(){
        const { banners }=this.state;
        return(
            <div className="banner"
                 onTouchStart={ (e)=>this.onTouchStart(e) } 
                 onTouchMove={ (e)=>this.onTouchMove(e) } 
                //  onTouchEnd={ (e)=>this.onTouchEnd(e) }

            >
                {banners.map((item, index) => (
                    <span key={index} style={ { transform:this.state.transform } }>
                        <img src={item} alt="" style={ { opacity:`${this.state.show?"inline-block":"none"}`}} onLoad={ ()=>this.setState({show:true}) }  />
                    </span>))}
            </div>
        );
    }
}