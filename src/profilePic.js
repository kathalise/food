import React from "react";

export default function ProfilePic({
    firstname,
    lastname,
    imgUrl,
    // toggleUploader,
    imgClassName,
}) {
    return (
        <>
            <img
                // onClick={toggleUploader}
                className={imgClassName}
                src={imgUrl}
                alt={`${firstname} ${lastname}`}
            />
            <p>
                {firstname} {lastname}
            </p>
        </>
    );
}
