import React from "react";
// import Logo from "./logo.js";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className="footer-container">
                <div>
                    <a href="/">
                        <img
                            className="logo-footer"
                            src="/logo.png"
                            alt="logo"
                        />
                    </a>
                </div>
                <p>
                    Berlin, Germany<br></br>
                    All rights reserved © 2020 Katharina Wolf
                </p>
                <div style={{ position: "absolute", right: "150px" }}>
                    <Link
                        style={{
                            color: "black",
                        }}
                        to={"/about"}
                    >
                        <p>About</p>
                    </Link>

                    <p
                        style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                    >
                        Contact
                    </p>
                </div>
            </div>
        </>
    );
}
