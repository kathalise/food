import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Logo from "./logo.js";
import Registration from "./registration.js";
import Login from "./login";
// import ResetPassword from "./resetpw.js";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <h1>Fridge > share > love</h1>
            <Logo />

            <div>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        {/* <Route path="/reset" component={ResetPassword} />  */}
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
