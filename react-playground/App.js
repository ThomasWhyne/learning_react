import React,{ Component } from "react";
import PropTypes from "prop-types";
import { Provider, connect } from "react-redux";
console.log(connect)

console.log(PropTypes)
const Repeate=(props)=>{
    const items=[];
    let i=1;
    while (i<=props.num) {
        items.push(props.children(i))
        i+=1;
    }
    return items;
}

const ListOfTenThings=()=>{
    return (
        <Repeate num={ 10 }>
            { (index)=><div key={ index }>This is the { 
                index===1?"1st":index===2?"2nd":index===3?"3rd":`${index}th`
             } item in the list</div> }
        </Repeate>
    )
}

export default class App extends Component{
    render(){
        return(
            <div>
                { this.props.slogan }
                { <ListOfTenThings></ListOfTenThings> }
            </div>
        )
    }
}
App.defaultProps={
    slogan:18
};
App.propTypes={
    slogan:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}