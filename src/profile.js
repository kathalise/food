import React, { useState, useEffect } from "react";
// import Bio from "./bio";
import axios from "./axios";
import ChangeProfilePic from "./changeProfilePic";
import useModal from "./useModal";
import Message from "./message";
import SendMessage from "./sendMessage";
import UsersOffers from "./usersOffers";
import LoggedInUsersOffers from "./userLoggedInOffers";

export default function Profile({
    // firstname,
    // lastname,
    imgurl,
    // imgClassName,
    // userId,
}) {
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
    // const [values, handleChange] = useStatefulFields();
    // const [handleSubmit, error] = useInputSubmit("/uploadProfilepic", values);
    // useStatefulFields();
    // useInputSubmit();
    const { isShowing, toggle } = useModal();

    return (
        <>
            <div className="user-profile">
                {/* <h1>Hey {firstname} !</h1> */}
                <img
                    onClick={toggle}
                    // className={imgClassName}
                    src={imgurl}
                    alt={`${user.firstname} ${user.lastname}`}
                    style={{ height: "400px" }}
                />
                <h2>
                    {user.firstname} {user.lastname}
                </h2>
                {/* <Bio /> */}
            </div>
            <ChangeProfilePic />
            <Message userId={user.id} />
            <LoggedInUsersOffers />
        </>
    );
}
