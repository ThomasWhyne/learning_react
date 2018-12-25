import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

const AuthExample=()=><Router>
    <div>
        <AuthButton/>
        <ul>
            <li>
                <Link to="/public">public page</Link>
            </li>
            <li>
                <Link to="/protected">protected page</Link>
            </li>
        </ul>
        <Route path="/public" component={ Public }/>
        <Route path="/login" component={ Login } />
        <PrivateRoute path="/protected" component={ Protected }/>
    </div>
</Router>;

const PrivateRoute=({component:Component,...rest})=>{
    return <Route {...rest} render={ props=>{
       
        return fakeAuth.isAuthenticated?<Component/>:<Redirect to={ { pathname:"/login", state:{ from:props.location } } } />
    } } />
}

const Public = () => <div>public</div>;

const Protected=()=><div>Protected</div>;

const fakeAuth={
    isAuthenticated:false,
    authenticate(callback){
        this.isAuthenticated=true;
       setTimeout(() => {
           callback();
       }, 1000);
    },
    signout(callback){
        this.isAuthenticated=false;
        setTimeout(() => {
            callback();
        }, 1000);
    }
};

class Login extends React.Component{
    state={
        redirectToReferer:false
    }
    login=()=>{
        // fakeAuth.isAuthenticated=true;
        fakeAuth.authenticate(()=>{
            this.setState({
                redirectToReferer:true
            })
        });

    }
    logout=()=>{
        this.setState({
            redirectToReferer:false
        })
    }
    render(){
        let { from }=this.props.location.state||{from:{pathname:'/'}};
        if(this.state.redirectToReferer)return <Redirect to={from} />
        return (
            <div>
                <AuthButton  />
                <p>you must login to view the protected page</p>
                <button onClick={ this.login }>Login</button>
            </div>
        );
    }
}

const AuthButton=withRouter(
    ({ history }) => {
        return fakeAuth.isAuthenticated ? (
            <div>
                <p> welcome </p>
                <button onClick={() => {
                    fakeAuth.signout(() => {
                        history.push("/");
                    })
                }}>Sign out </button>
            </div>
        ) : (
                <div>
                    <p>you have not logged in</p>
                </div>
            );
    }
)

ReactDOM.render(<AuthExample/>,document.getElementById("root"));