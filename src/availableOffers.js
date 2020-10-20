import React, { useState, useEffect } from "react";
import axios from "./axios";
import moment from "moment";

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
                <h1>Oops.. seems like this user does not exist!</h1>
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
                        <p>#{offers.category}</p>
                        <p>
                            Posted {moment(offers.created_at_time).fromNow()} by{" "}
                            <strong>{offers.firstname}</strong>
                        </p>
                        <br></br>
                        <br></br>
                        <p>{offers.description}</p>

                        <button>Contact Offerer</button>
                    </div>
                </div>
            </>
        );
    }

    // }
}
