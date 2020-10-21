import React, { useState } from "react";
import axios from "./axios";

// /send/message/:otherId

function useInputSubmit(url, values) {
    const [error, setError] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Das ist das e", e);

        console.log("INSIDE useImputSubmit/ ", values);
        axios
            .post(`/send/message`, values)
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

export default function SendMessage() {
    // const [values, handleChange] = useStatefulFields();
    const [handleSubmit, error] = useInputSubmit();

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
                    <form
                    // onChange={handleChange}
                    >
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
                            name="description"
                            rows="7"
                            maxLength="1000"
                        />

                        <button
                        // onClick={handleSubmit}
                        >
                            Send
                        </button>
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
