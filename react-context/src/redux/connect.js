import React, { Component } from "react";
import PropTypes from "prop-types";

export const connect=(providerStore, providerDispatch)=>{

    return (Com) => {
        class Connect extends Component {
            static contextTypes = {
                store: PropTypes.object,
                dispatch: PropTypes.func,
                subscribe: PropTypes.func,
                getStore: PropTypes.func
            }
            constructor(props) {
                super(props);
                this.state = {};
            }
            _update = () => {
                const { getStore } = this.context;
                // console.log(getStore())
                this.setState({
                    ...getStore()
                },()=>{
                    console.log(this.state)
                })
            }
            componentWillMount() {
                const { subscribe, dispatch, getStore } = this.context;
                // console.log(this.context)
                this._update();
                subscribe(() => this._update());
            }
            render() {
                 const { subscribe, dispatch, getStore } = this.context;
                // providerDispatch(dispatch)
                // console.log(providerStore(getStore()))
                // console.log(providerDispatch(dispatch))
                // console.log(providerDispatch(dispatch))
                return (
                    <div className="connect">
                        { 
                            providerDispatch ? <Com {...providerStore(this.state)} {...providerDispatch(dispatch)  }/>:<Com { ...providerStore(this.state)} />
                         }
                    </div>
                )
            }
        }
        return Connect;
    }
}