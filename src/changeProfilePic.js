import React, { useState } from "react";
import Bio from "./bio";
import axios from "./axios";

function useStatefulFields() {
    const [values, setValues] = useState(new FormData());

    const handleChange = ({ target }) => {
        setValues((formData) => {
            // if (target.files) {
            formData.set(target.name, target.files[0]);
            // } else {
            //     formData.set(target.name, target.value);
            // }
            console.log("FormData", formData);
            return formData;
        });
    };

    return [values, handleChange];
}
const closeMe = () => {
    console.log("x clicked");
};

function useInputSubmit(url, values) {
    const [error, setError] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Das ist das e", e);

        console.log("INSIDE useImputSubmit");
        axios
            .post(url, values)
            .then(({ data }) => {
                console.log("data:", data);
            })
            .catch((err) => {
                console.log("error in axios post /", err);
                setError();
            });
    };
    return [handleSubmit, error];
}

export default function ChangeProfilePic({ isShowing, hide }) {
    const [values, handleChange] = useStatefulFields();
    const [handleSubmit, error] = useInputSubmit("/uploadProfilepic", values);
    const [modalState, setModalState] = useState(true);

    const manageState = () => {
        setModalState(!modalState);
        console.log("changing state");
    };

    if (!modalState) {
        return (
            <>
                <div>
                    {/* <button onClick={manageState}>SHOW MODAL</button> */}
                </div>
                <div className="uploader">
                    <h2
                        className="closeX" //onClick={closeMe}
                        onClick={manageState}
                    >
                        x
                    </h2>
                    <form
                        onChange={handleChange}
                        style={{ paddingTop: "30px" }}
                    >
                        <input
                            key={5}
                            type="file"
                            name="file"
                            placeholder="Upload an Image"
                            accept="image/*"
                        />
                        <button onClick={handleSubmit}>Upload</button>
                    </form>
                </div>
                <div className="overlay"></div>
            </>
        );
    } else {
        return (
            <div className="reg-buttons button">
                <button className="button-profile-pic" onClick={manageState}>
                    Upload picture
                </button>
            </div>
        );
    }
}
