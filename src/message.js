import React, { useEffect, useState } from "react";
import axios from "./axios";
// import useModal from "./useModal";
import { Link } from "react-router-dom";

import moment from "moment";
import Reply from "./reply";

export default function Message() {
    const [message, setmessage] = useState([]);
    const [communicationPartner, setCommunicationPartner] = useState();

    const [modalState, setModalState] = useState(true);

    const manageState = () => {
        setModalState(!modalState);
        console.log("changing state");
    };

    useEffect(() => {
        // console.log("EFFECT IS RUNNING... userId", userId);

        (async () => {
            try {
                const { data } = await axios.get(`/get/message`);
                console.log("res from db DATA message, ****data Merle: ", data);
                console.log(
                    "res from db DATA message, data == Merle: "
                    // data[0].sender_id == userId
                );
                setmessage(data);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, []);

    if (!modalState) {
        return (
            <>
                <div className="msg-container">
                    {message && <h2>Private Messages</h2>}
                    {message &&
                        message.reverse().map((item, i) => {
                            return (
                                <div
                                    key={i + 1}
                                    style={{
                                        border: "none",
                                        marginBottom: "0",
                                    }}
                                >
                                    <div key={item.title} className="msg">
                                        <Link
                                            to={`/user/${item.id}`}
                                            key={item}
                                        >
                                            <img
                                                src={item.imgurl}
                                                alt={`${item.firstname} ${item.lastname}`}
                                            />
                                        </Link>
                                        <div
                                            key={item.firstname}
                                            className="msg-content"
                                        >
                                            <p>
                                                {moment(
                                                    item.msg_created_at
                                                ).fromNow()}
                                                from{" "}
                                                <strong>
                                                    {item.firstname}
                                                </strong>
                                                :
                                            </p>
                                            <p>{item.message_text}</p>
                                        </div>
                                    </div>
                                    <h3
                                        style={{
                                            top: "125px",
                                            right: "500px",
                                        }}
                                        className="closeY"
                                        onClick={manageState}
                                    >
                                        X
                                    </h3>
                                </div>
                            );
                        })}
                    <Reply />
                </div>
                <div className="overlay-msgcontainer"></div>
            </>
        );
    } else {
        return (
            <>
                <div
                    style={{
                        border: "none",
                        justifyContent: "flex-end",
                        paddingBottom: 0,
                    }}
                    className="user-profile"
                >
                    <button onClick={manageState}>My Messages</button>
                </div>
            </>
        );
    }
}
