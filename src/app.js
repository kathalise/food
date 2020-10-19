import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./header";
import Logout from "./logout";
import Footer from "./footer";
import { useStore } from "react-redux";
// import Categories from "./categories";
import ProfilePic from "./profilePic";
import Bio from "./bio";
import UploadProduct from "./uploadProduct";
import AvailableOffers from "./availableOffers";

export default function App() {
    const [user, setUser] = useState("");
    useEffect(() => {
        console.log("EFFECT IS WORKING", user);
        (async () => {
            try {
                const { data } = await axios.get("/user/logged-in", {});
                console.log("res from db: ", data);
                setUser(data);
                // console.log(data.id);
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
                    <Logout />
                    <a href={"/offers"}>
                        <button className="submit-button">List</button>
                    </a>
                </header>
                <div className="app">
                    <div className="app-render">
                        <div className="user-profile">
                            <ProfilePic
                                firstname={user.firstname}
                                lastname={user.lastname}
                                imgUrl={user.imgUrl || "/default.png"}
                                // toggleUploader={this.toggleUploader}
                            />
                            <Bio />
                        </div>
                        <div className="offered-product">
                            <UploadProduct />
                        </div>
                        <div className="available-product">
                            <Route path="/offers" component={AvailableOffers} />

                            {/* <AvailableOffers /> */}
                        </div>
                    </div>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}
