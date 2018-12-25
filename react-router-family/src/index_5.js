import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Prompt, Switch } from "react-router-dom";
import './index.css';

const routes=[{
    path:"/",
    exact:true,
    main:()=><h2>Home</h2>
}, {
        path: "/Bubblegum",
        exact: false,
        main: () => <h2>Bubblegum</h2>
    }, {
        path: "/Showlaces",
        exact: false,
        main: () => <h2>Showlaces</h2>
    }];

const SidebarExample=()=>(
    <Router>
        <div style={{ display:"flex" }}> 
            <div style={{ 
                padding:"10px",
                width:"40%",
                backgroundColor:"aqua"
             }}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/bubblegum">Bubblegum</Link>
                    </li>
                    <li>
                        <Link to="/Showlaces">Shoelaces</Link>
                    </li>
                </ul>
            </div>
            <div style={{
                flex: 1,
                padding: "10px"
            }}>
                { routes.map((r,i)=><Route  exact={r.exact} path={r.path} component={ r.main} key={i} />)}
            </div>
        </div>
    </Router>
);

ReactDOM.render(<SidebarExample />, document.getElementById("root"));