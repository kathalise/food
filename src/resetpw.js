import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";
import Login from "./login";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
        };
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    submitEmail() {
        const { email } = this.state;
        console.log("email submitted for reset", email);
        axios
            .post("/reset-email", {
                email,
            })
            .then(({ data }) => {
                // console.log("data from server: ", data);
                if (data.success) {
                    this.setState({
                        current: 2,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Error in axios POST / reset-email", err);
                this.setState({
                    error: true,
                });
            });
    }

    submitCode() {
        const { email, code, password } = this.state;
        console.log("code new-password in reset: ", email, code, password);
        axios
            .post("/reset-code", {
                email,
                code,
                password,
            })
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        current: 3,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        let elem;
        if (this.state.current == 1) {
            elem = (
                <div className="registration-form">
                    <div className="closeY">
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                            to={"/"}
                        >
                            <p
                                style={{
                                    marginTop: "0",
                                    textAlign: "right",
                                    fontSize: "20px",
                                }}
                            >
                                X
                            </p>
                        </Link>
                    </div>
                    <h3 style={{ alignSelf: "center" }}>Reset Your Password</h3>
                    {/* <p>Please enter Your email address:</p> */}
                    {/* <p>Please enter Your email address</p> */}
                    {this.state.error && (
                        <div className="error">
                            Oops! Something went wrong. Please try again.
                        </div>
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        key={0} // what ever this is?
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        className="submit-button"
                        onClick={() => this.submitEmail()}
                    >
                        Next Step
                    </button>
                    <div className="redirect">
                        <Link to="/registration" style={{ color: "black" }}>
                            Not yet a member? Register here.
                        </Link>
                        <br></br>
                        <br></br>
                        <Link to="/login" style={{ color: "black" }}>
                            Found password? Login here.
                        </Link>
                    </div>
                </div>
            );
        } else if (this.state.current == 2) {
            elem = (
                <div className="registration-form">
                    <h3 style={{ alignSelf: "center" }}>Reset Your Password</h3>
                    {this.state.error && (
                        <div className="error">
                            Oops! Incomplete input. Try again.
                        </div>
                    )}
                    {/* <p style={{ alignSelf: "center" }}>
                        Please enter the code you received
                    </p> */}
                    <input
                        name="code"
                        type="text"
                        placeholder="Enter Code"
                        key={4} // what ever this is?
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter New Password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        className="submit-button"
                        onClick={() => this.submitCode()}
                    >
                        Save New Password
                    </button>
                </div>
            );
        } else {
            // console.log("SOMETHING SOMETHING");
            elem = (
                <div className="reset-final">
                    <h3 style={{ alignSelf: "center" }}>
                        Your password has been reset successfully!
                    </h3>
                    <Login />
                </div>
            );
        }
        return <div>{elem}</div>;
    }
}
