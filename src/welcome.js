import React from "react";
import { HashRouter, Route } from "react-router-dom";
// import Logo from "./logo.js";
import Registration from "./registration.js";
import Login from "./login";
import ResetPassword from "./resetpw.js";
import { Link } from "react-router-dom";
import Header from "./header.js";
import Footer from "./footer.js";

export default function Welcome() {
    return (
        <div>
            <div className="header-space"></div>
            <header>
                <HashRouter>
                    <Link to="/">
                        <img className="logo" src="/logo.png" alt="logo" />
                    </Link>
                    <h1>
                        Pick me up <em> ... before I go-go</em>
                    </h1>
                    <div className="reg-buttons">
                        <Link to="/registration" style={{ color: "black" }}>
                            <button>Register</button>
                        </Link>

                        <Link to="/login" style={{ color: "black" }}>
                            <button>Login </button>
                        </Link>
                    </div>
                </HashRouter>
            </header>
            <div className="layout-wrapper">
                <div className="welcome-container">
                    <div className="router-welcome">
                        <HashRouter>
                            <Route
                                exact
                                path="/registration"
                                component={Registration}
                            />
                            <Route path="/login" component={Login} />
                            <Route path="/reset" component={ResetPassword} />
                        </HashRouter>
                    </div>
                    <div className="about-project-background">
                        <div className="about-project">
                            <h2>
                                Hey You, are you ready to put an end to
                                foodwaste?
                            </h2>
                            <a href="/">
                                Here you can find out more about the project
                            </a>
                        </div>
                    </div>
                    <div className="food-items-container">
                        <div className="food-cards"></div>
                        <div className="food-cards"></div>
                        <div className="food-cards"></div>
                        <div className="food-cards"></div>
                        <div className="food-cards"></div>
                    </div>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}
