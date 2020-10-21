import React, { useState } from "react";
import Bio from "./bio";
// import axios from "./axios";
import ChangeProfilePic from "./changeProfilePic";

// function useStatefulFields() {
//     const [values, setValues] = useState(new FormData());

//     const handleChange = ({ target }) => {
//         setValues((formData) => {
//             // if (target.files) {
//             formData.set(target.name, target.files[0]);
//             // } else {
//             //     formData.set(target.name, target.value);
//             // }
//             console.log("FormData", formData);
//             return formData;
//         });
//     };

//     return [values, handleChange];
// }

// function useInputSubmit(url, values) {
//     const [error, setError] = useState();
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Das ist das e", e);

//         console.log("INSIDE useImputSubmit");
//         axios
//             .post(url, values)
//             .then(({ data }) => {
//                 console.log("data:", data);
//             })
//             .catch((err) => {
//                 console.log("error in axios post /", err);
//                 setError();
//             });
//     };
//     return [handleSubmit, error];
// }

export default function Profile({ firstname, lastname, imgurl, imgClassName }) {
    // const [values, handleChange] = useStatefulFields();
    // const [handleSubmit, error] = useInputSubmit("/uploadProfilepic", values);
    // useStatefulFields();
    // useInputSubmit();
    return (
        <>
            <div className="user-profile">
                {/* <h1>Hey {firstname} !</h1> */}
                <img
                    // onClick={toggleUploader}
                    className={imgClassName}
                    src={imgurl}
                    alt={`${firstname} ${lastname}`}
                    style={{ height: "250px" }}
                />
                <h2>
                    {firstname} {lastname}
                </h2>
                <Bio />

                <button>Message {firstname}</button>
            </div>
            <ChangeProfilePic />
        </>
    );
}
