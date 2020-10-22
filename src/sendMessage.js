import React, { useState, useEffect } from "react";
import axios from "./axios";

// /send/message/:otherId

function useStatefulFields() {
    const [values, setValues] = useState([]);

    const handleChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value,
        });
        console.log("values", values);
    };

    return [values, handleChange];
}

function useInputSubmit(url, values) {
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Das ist das e", e);
        // console.log("INSIDE useImputSubmit/ ", values);

        axios
            .post(url, values)
            .then(({ data }) => {
                console.log("data:", data);
                if (data.success) {
                    location.replace("/");
                    console.log("UPLOAD SUCCESSFUL");
                }
            })
            .catch((err) => {
                console.log("error in axios post /", err);
                setError();
            });
    };
    return [handleSubmit, error];
}

export default function SendMessage({ otherId }) {
    const [values, handleChange] = useStatefulFields();
    const [handleSubmit, error] = useInputSubmit(
        `/message/user/${otherId}`,
        values
    );
    console.log("INSIDE useImputSubmit otherID/ ", otherId);

    const [modalState, setModalState] = useState(true);

    const manageState = () => {
        setModalState(!modalState);
        console.log("changing state");
    };

    if (!modalState) {
        return (
            <div className="uploader-container">
                <div className="product-uploader">
                    <h2 style={{ textAlign: "center" }}>Send Message</h2>
                    <form onChange={handleChange}>
                        <input
                            key={1}
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                        />
                        <textarea
                            key={3}
                            type="text"
                            placeholder="Your message"
                            name="message"
                            rows="7"
                            maxLength="1000"
                        />

                        <button onClick={handleSubmit}>Send</button>
                        <button onClick={manageState}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <button onClick={manageState}>Send Message</button>
            </>
        );
    }
}
