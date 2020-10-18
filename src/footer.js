import React from "react";
// import Logo from "./logo.js";

export default function Footer() {
    return (
        <div className="footer-container">
            <div>
                <a href="/">
                    <img className="logo-footer" src="/logo.png" alt="logo" />
                </a>
            </div>
            <p>
                Berlin, Germany<br></br>
                All rights reserved © 2020 Katharina Wolf
            </p>
        </div>
    );
}
