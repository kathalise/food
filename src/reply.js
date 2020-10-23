import React, { useState } from "react";
import axios from "./axios";

export default function Reply() {
    function useStatefulFields() {
        const [values, setValues] = useState([]);

        const handleChange = ({ target }) => {
            setValues({
                ...values,
                [target.name]: target.value,
            });
            console.log("values", values);
            // console.log("userId", userId);
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

    const [values, handleChange] = useStatefulFields();
    const [handleSubmit, error] = useInputSubmit(`/message/user`, values);
    return (
        <>
            {/* <div className="uploader-container"> */}
            {/* <div className="product-uploader"> */}
            <form onChange={handleChange}>
                <input
                    key={2}
                    type="text"
                    placeholder="id"
                    name="id"
                    required
                />
                <textarea
                    className="reply-textarea"
                    style={{ width: "100%", marginTop: "10px", border: "none" }}
                    key={3}
                    type="text"
                    placeholder="Your message"
                    name="message"
                    rows="5"
                    maxLength="1000"
                />
                <div
                    style={{
                        border: "none",
                        justifyContent: "flex-end",
                        paddingBottom: 0,
                        marginTop: 0,
                    }}
                    className="user-profile"
                >
                    <button
                        style={{
                            width: "200px",
                        }}
                        onClick={handleSubmit}
                    >
                        Send
                    </button>
                </div>
            </form>
        </>
        // </div>
        // </div>
    );
}
