import React from "react";
import ReactDOM from "react-dom";
import Header from "./header.js";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import Logout from "./logout";

export default function App() {
    return (
        <BrowserRouter>
            {/* {this.state.error && (
                <div className="error">
                    Oops! Something went wrong.<br></br>
                    Please try again.
                </div>
            )} */}
            <header>
                <Header />
                <Logout />
            </header>
            <h1> I AM LOGGED IN</h1>
        </BrowserRouter>
    );
}
