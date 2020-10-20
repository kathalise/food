import React, { useState, useEffect } from "react";
import axios from "./axios";
import moment from "moment";
import { Link } from "react-router-dom";

export default function AllOffers() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        console.log("EFFECT IS RUNNING... AllOffers");

        (async () => {
            try {
                const { data } = await axios.get("/get/all-offers");
                console.log("res from db /get/all-offers, DATA: ", data);

                setItems(data);
                console.log("items", items);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, []);
    return (
        <>
            <h1
                style={{
                    textAlign: "center",
                }}
            >
                AVAILABLE OFFERS
            </h1>
            <div className="all-offers-container">
                {items &&
                    items.map((item, i) => {
                        return (
                            <div key={i} className="offers-card">
                                <h3>#{item.category}</h3>
                                <h2>{item.title}</h2>
                                <Link to={`/offers/${item.id}`} key={item.id}>
                                    <img
                                        key={item.id}
                                        src={
                                            item.imgurl_offer ||
                                            "/default-food.png"
                                        }
                                        style={{
                                            height: "200px",
                                            width: "250px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Link>
                                <p>{moment(item.created_at_time).fromNow()}</p>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
