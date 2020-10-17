import React from "react";
import Logo from "./logo.js";

export default function Footer() {
    return (
        <div className="footer-container">
            <Logo />
            <p>
                {" "}
                Berlin, Germany<br></br>
                All rights reserved © 2020 Katharina Wolf
            </p>
        </div>
    );
}
