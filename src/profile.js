import React from "react";
import Bio from "./bio";

export default function Profile({
    firstname,
    lastname,
    imgUrl,
    // toggleUploader,
    imgClassName,
}) {
    return (
        <>
            <div className="user-profile">
                {/* <h1>Hey {firstname} !</h1> */}
                <img
                    // onClick={toggleUploader}
                    className={imgClassName}
                    src={imgUrl}
                    alt={`${firstname} ${lastname}`}
                />
                <h2>
                    {firstname} {lastname}
                </h2>
                <Bio />

                <button>Message {firstname}</button>
            </div>
        </>
    );
}
