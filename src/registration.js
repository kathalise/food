import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.submit = this.submit.bind(this);
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    submit() {
        const { firstname, lastname, email, password } = this.state;
        axios
            .post("/register", {
                firstname,
                lastname,
                email,
                password,
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Error in axios POST / register", err);
            });
    }

    render() {
        return (
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
                <h3
                    style={{
                        alignSelf: "center",
                    }}
                >
                    Join us today!
                </h3>
                {this.state.error && (
                    <div className="error">
                        Oops! Something went wrong.<br></br>
                        Please try again.
                    </div>
                )}
                <input
                    name="firstname"
                    placeholder="Enter First Name"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="lastname"
                    placeholder="Enter Last Name"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Choose Password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button className="submit-button" onClick={() => this.submit()}>
                    Register
                </button>
                <div className="redirect">
                    {/* <Link to="/login" style={{ color: "black" }}>
                        Already a member? Login here.
                    </Link> */}
                </div>
            </div>
        );
    }
}
