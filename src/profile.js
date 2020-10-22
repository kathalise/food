import React, { useState } from "react";
import Bio from "./bio";
// import axios from "./axios";
import ChangeProfilePic from "./changeProfilePic";
import useModal from "./useModal";

export default function Profile({ firstname, lastname, imgurl, imgClassName }) {
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
                    className={imgClassName}
                    src={imgurl}
                    alt={`${firstname} ${lastname}`}
                    style={{ height: "250px" }}
                />
                <h2>
                    {firstname} {lastname}
                </h2>
                <Bio />

                <button>Update Bio</button>
            </div>
            <ChangeProfilePic />
        </>
    );
}
