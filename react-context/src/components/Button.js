import React from "react";
import PropTypes from "prop-types";

import AppContext from "../contexts/AppContext";
import { connect } from "../redux/connect";

class Button extends React.Component {
    // static contextTypes={
    //     store:PropTypes.object,
    //     dispatch: PropTypes.func,
    //     subscribe: PropTypes.func,
    //     getStore: PropTypes.func
    // }
    // componentWillMount(){
    //     const { subscribe }=this.context;
    //     this._update();
    //     subscribe(()=>this._update());
    // }
    // _update(){
    //     const { getStore } = this.context;
    //     this.setState({
    //         ...getStore()
    //     },()=>{
      
    //     })
    // }
    changePayload(type){
         const { change } = this.props;
        change(type);
    }

    //     onClick = { () => { this.changePayload("BODY") }
    //     onClick = { () => { this.changePayload("HEAD") }
    // }
    // }
    // }
    render() {
        return(
            <div className="button">
                <div className="btn" onClick={ ()=>{ this.changePayload("HEAD") } }>{ this.props.headBtn }</div>
                <div className="btn" >{ this.props.bodyBtn }</div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            headBtn: state.headBtn,
            bodyBtn: state.bodyBtn
        }
    },
    (dispatch) => {
        return {
            change: (type) => {
                dispatch({
                    type,
                    payload: `I am the ${type.toLowerCase()} changed by reduces`
                })
            }
        }
    }
)(Button);;