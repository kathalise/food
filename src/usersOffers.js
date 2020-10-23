import React, { useState, useEffect } from "react";
import axios from "./axios";
import moment from "moment";
import { Link } from "react-router-dom";

export default function UsersOffers({ otherUserId, firstname }) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        console.log("EFFECT IS RUNNING... ***otherId:", otherUserId);

        (async () => {
            try {
                const { data } = await axios.get(
                    `/users/offers/${otherUserId}`
                );
                console.log("res from db /offer/by/user: ", data);
                setItems(data);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, [otherUserId]);

    // if (otherId) {
    //     return (
    //         <>
    //             <h1>{firstname}'s Offers</h1>
    //         </>
    //     );
    // } else {
    //     return (
    //         <>
    //             <h1>My Offers</h1>
    //         </>
    //     );
    // }
    return (
        <div className="users-offers-container">
            <h1
                style={{
                    textAlign: "center",
                }}
            >
                {firstname}'s Offers
            </h1>

            <div className="offers-userprofile">
                {items &&
                    items.map((item, i) => {
                        return (
                            <div
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    marginLeft: "2px",
                                    marginBottom: "2px",
                                }}
                                key={i}
                                className="offers-card"
                            >
                                {/* <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                    to={`/by/${item.category}`}
                                    key={item.category}
                                >
                                    <h4>#{item.category}</h4>
                                </Link> */}

                                <h3>{item.title}</h3>
                                <Link to={`/offers/${item.id}`} key={item.id}>
                                    <img
                                        key={item.id}
                                        src={
                                            item.imgurl_offer ||
                                            "/default-food.png"
                                        }
                                        style={{
                                            height: "80px",
                                            width: "80px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Link>
                                <p>{moment(item.created_at_time).fromNow()}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
