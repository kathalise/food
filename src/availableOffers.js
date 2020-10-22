import React, { useState, useEffect } from "react";
import axios from "./axios";
import moment from "moment";
import { Link } from "react-router-dom";

export default function AvailableOffers(offerId) {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        console.log(
            "EFFECT IS RUNNING... otherId",
            offerId.match.params.offerId
        );

        (async () => {
            try {
                const { data } = await axios.get(
                    `/get/offers/${offerId.match.params.offerId}`,
                    {}
                );
                console.log("res from db DATA: ", data);
                if (data.noOfferId) {
                    console.log("NO SUCH ITEM");
                    ({
                        noOfferId: true,
                    });
                } else {
                    setOffers(data);
                }

                console.log("offers", offers);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, []);

    // render() {
    if (offers.noOfferId) {
        return (
            <div>
                <h1>Oops.. seems like this item does not exist!</h1>
            </div>
        );
    } else {
        return (
            <>
                <div className="available-product">
                    <div>
                        <h2>{offers.title}</h2>
                        <img
                            className="picture-offer"
                            src={offers.imgurl_offer || "/default-food.png"}
                            alt={offers.title}
                            // style={{ height: "200px" }}
                        />
                    </div>
                    <div className="available-product-detail">
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                            to={`/by/${offers.category}`}
                            key={offers.category}
                        >
                            <p>#{offers.category}</p>
                        </Link>

                        <p>
                            Posted {moment(offers.created_at_time).fromNow()} by
                        </p>
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                            to={`/user/${offers.offerer_id}`}
                        >
                            <p>
                                <strong>{offers.firstname}</strong>
                            </p>
                        </Link>
                        <br></br>
                        <br></br>
                        <p>{offers.description}</p>

                        <Link
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                            to={`/user/${offers.offerer_id}`}
                            key={offers.id}
                        >
                            <button>Want to pick it up</button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    // }
}
