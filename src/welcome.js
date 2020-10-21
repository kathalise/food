import React from "react";
import { HashRouter, Route } from "react-router-dom";
// import Logo from "./logo.js";
import Registration from "./registration.js";
import Login from "./login";
import ResetPassword from "./resetpw.js";
import { Link } from "react-router-dom";
import Header from "./header.js";
import Footer from "./footer.js";
import AllOffers from "./allOffers";
import AvailableOffers from "./availableOffers";
import OffersByCategory from "./offersByCategory";
import About from "./about.js";

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
                            <Route exact path="/about" component={About} />
                        </HashRouter>
                    </div>
                    <HashRouter>
                        <div className="about-project-background">
                            <div className="about-project">
                                <h2>
                                    Hey You, are you ready to put an end to
                                    foodwaste?
                                </h2>
                                <Link to="/about">
                                    Here you can find out more about the project
                                </Link>
                            </div>
                        </div>
                    </HashRouter>
                    <HashRouter>
                        <>
                            {/* <div className="all-offers-container"> */}
                            <Route exact path="/" component={AllOffers} />
                            {/* </div> */}

                            <Route
                                exact
                                path="/offers/:offerId"
                                component={AvailableOffers}
                            />
                            <div
                                style={{ marginTop: "40px" }}
                                className="all-product"
                            >
                                <Route
                                    exact
                                    path="/by/:category"
                                    component={OffersByCategory}
                                />
                            </div>
                        </>
                    </HashRouter>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}
