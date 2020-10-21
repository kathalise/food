import React, { useState, useEffect } from "react";
import axios from "./axios";
import moment from "moment";
import { Link } from "react-router-dom";

export default function OffersByCategory(category) {
    const [itemsFiltered, setItemsFiltered] = useState();
    useEffect(() => {
        console.log(
            "EFFECT IS RUNNING... OffersByCategory",
            category.match.params.category
        );

        (async () => {
            try {
                const { data } = await axios.get(
                    `/offers/by/${category.match.params.category}`,
                    []
                );
                console.log("res from db /offers/by/${category}, DATA: ", data);

                setItemsFiltered(data);
                console.log("data.title", data[0].title);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, []);

    return (
        <>
            <div className="all-offers-container">
                {itemsFiltered &&
                    itemsFiltered.map((item, i) => {
                        return (
                            <div key={i} className="offers-card">
                                <h3>#{item.category}</h3>
                                <h2 stype={{ margin: "10px" }}>{item.title}</h2>
                                <Link to={`/offers/${item.id}`} key={item.id}>
                                    <img
                                        key={item.id}
                                        src={
                                            item.imgurl_offer ||
                                            "/default-food.png"
                                        }
                                        style={{
                                            height: "200px",
                                            width: "200px",
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
