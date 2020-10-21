import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function GetOtherUser(otherUserId) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        console.log(
            "EFFECT IS RUNNING... otherUserId",
            otherUserId.match.params.otherUserId
        );

        (async () => {
            try {
                const { data } = await axios.get(
                    `/get/user/${otherUserId.match.params.otherUserId}`
                );
                console.log("res from db DATA other user: ", data);
                setUser(data);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, []);

    return (
        <>
            <div className="user-profile">
                {/* <h1>Hey {firstname} !</h1> */}
                <img
                    // className={imgClassName}
                    src={user.imgurl}
                    alt={`${user.firstname} ${user.lastname}`}
                    style={{ height: "250px" }}
                />
                <h2 style={{ textAlign: "center" }}>
                    {user.firstname} {user.lastname}
                </h2>
                <button>Message {user.firstname}</button>
            </div>
        </>
    );
}
