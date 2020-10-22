import React, { useEffect, useState } from "react";
import axios from "./axios";
import SendMessage from "./sendMessage";
import useModal from "./useModal";
import Route from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function GetOtherUser(otherUserId) {
    let history = useHistory();
    const [user, setUser] = useState([]);
    const { isShowing, toggle } = useModal();

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
                if (data.same) {
                    history.push("/myProfile");
                } else {
                    setUser(data);
                }
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
                    style={{ height: "400px" }}
                />
                <h2 style={{ textAlign: "center" }}>
                    {user.firstname} {user.lastname}
                </h2>
                {/* <button onClick={toggle}>Message {user.firstname}</button> */}
            </div>
            <SendMessage otherId={user.id} firstname={user.firstname} />
        </>
    );
}
