import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import { connect } from "../redux/connect";

class Body extends React.Component{
    // static contextTypes={
    //     store:PropTypes.object,
    //     subscribe: PropTypes.func,
    //     getStore: PropTypes.func
    // }
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log(this.state.body === nextState.body);
    //     if(this.state.body==nextState.body){
    //         return false
    //     }else{
    //         return true;
    //     }
    // }
    // componentWillMount() {
    //     const { subscribe } = this.context;
    //     this._update();
    //     subscribe(() => this._update());
    // }
    // _update() {
    //     const { getStore } = this.context;
    //     this.setState({
    //         ...getStore()
    //     }, () => {
    //         console.log("body updated by hooks in subscribes")
    //     })
    // }
    render(){
           const { body }=this.props;
        return (
            <div>
                <div className="body">{ body }</div>
                <Button></Button>
            </div>
        );
    }
}

export default connect(
    (state)=>{
        // console.log(state)
        return {
            body: state.body
        }
    }
    )(Body);