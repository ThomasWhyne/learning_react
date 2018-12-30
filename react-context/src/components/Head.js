import React from "react";
import PropTypes from "prop-types";
import { connect } from "../redux/connect";

 class Head extends React.Component {
    // static contextTypes={
    //     store:PropTypes.object,
    //     subscribe:PropTypes.func,
    //     getStore: PropTypes.func
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.head !== nextState.head) {
    //         return true
    //     } else {
    //         return false;
    //     }
    // }
    // componentWillMount(){
    //     const { subscribe } = this.context;
    //     this._update();
    //     subscribe(() => this._update());
    // }
    // _update() {
    //     const { getStore } = this.context;
    //     this.setState({
    //         ...getStore()
    //     }, () => {
    //         console.log("head updated by hooks in subscribes")
    //     })
    // }
    render() {
        // console.log(this.props)
        const { head }=this.props;
    //    console.log(this.props)
        return(
            <div className="head">{ head }</div>
        );
    }
}

export default connect(
    (state) => {
        return {
            head: state.head
        }
    }
)(Head);;