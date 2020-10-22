import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./header";
import Logout from "./logout";
import Footer from "./footer";
import { useStore } from "react-redux";
// import Categories from "./categories";
import Profile from "./profile";
import Bio from "./bio";
import UploadProduct from "./uploadProduct";
import AvailableOffers from "./availableOffers";
import AllOffers from "./allOffers";
import { Link } from "react-router-dom";
import OffersByCategory from "./offersByCategory";
import GetOtherUser from "./getOtherUser";
import SendMessage from "./sendMessage";
import Message from "./message";

export default function App() {
    const [user, setUser] = useState("");

    useEffect(() => {
        console.log("EFFECT IS WORKING");
        (async () => {
            try {
                const { data } = await axios.get("/user/logged-in", {});
                console.log("res from db in app: ", data);
                console.log(("data.id", data.id));
                setUser(data);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, []);

    return (
        <BrowserRouter>
            <div className="app-container">
                <header>
                    <Header />
                    <div className="reg-buttons">
                        <button>
                            <Link
                                to="/myProfile"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                My Profile{" "}
                            </Link>
                        </button>
                        <button>
                            <Link
                                to="/upload"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                Post Offer{" "}
                            </Link>
                        </button>
                        <Logout />
                    </div>
                </header>
                <div className="app">
                    <div className="app-render">
                        <Route
                            exact
                            path="/myProfile"
                            render={() => (
                                <Profile
                                    firstname={user.firstname}
                                    lastname={user.lastname}
                                    imgurl={user.imgurl || "/default.png"}
                                    userId={user.id}
                                />
                            )}
                        />

                        <Route
                            path="/message/:otherId"
                            render={() => (
                                <SendMessage SendMessage userId={user.id} />
                            )}
                        />
                        <Route
                            path="/user/:otherUserId"
                            component={GetOtherUser}
                        />
                        <Route
                            exact
                            path="/upload"
                            render={() => <UploadProduct userId={user.id} />}
                        />
                        {/* <div className="available-product"> */}
                        <Route
                            exact
                            path="/offers/:offerId"
                            component={AvailableOffers}
                        />
                        <div className="all-product">
                            <Route
                                exact
                                path="/by/:category"
                                component={OffersByCategory}
                            />
                        </div>
                    </div>
                </div>
                <div className="all-product">
                    <Route exact path="/" component={AllOffers} />
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}
