import React, { useState } from "react";
// import useForm from "react-hook-form";
import axios from "./axios";

function useStatefulFields() {
    const [values, setValues] = useState(new FormData());

    const handleChange = ({ target }) => {
        setValues((formData) => {
            if (target.files) {
                formData.set(target.name, target.files[0]);
            } else {
                formData.set(target.name, target.value);
            }
            // console.log("FormData", formData);
            return formData;
        });
    };

    return [values, handleChange];
}

function useInputSubmit(url, values) {
    const [error, setError] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Das ist das e", e);

        console.log("INSIDE useImputSubmit", values);
        axios
            .post(url, values)
            .then(({ data }) => {
                // console.log("data:", data);
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

export default function UploadProduct() {
    const [values, handleChange] = useStatefulFields();
    const [handleSubmit, error] = useInputSubmit("/post/offer", values);
    // const [modalState, setModalState] = useState(true);

    const manageState = () => {
        location.replace("/");
        console.log("changing state");
    };

    return (
        <div className="uploader-container">
            <div className="product-uploader">
                <h2 style={{ textAlign: "center" }}>Upload Item</h2>
                <img style={{ height: "100px" }} src={"/milk.png"} />
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
                <form onChange={handleChange}>
                    <input
                        key={1}
                        type="text"
                        placeholder="Title"
                        name="title"
                        required
                    />
                    <select
                        key={2}
                        className="category"
                        name="category"
                        defaultValue="no-value"
                    >
                        <option value="no-value" disabled>
                            Please Select A Category
                        </option>
                        <option value="beverage">Beverage</option>
                        <option value="dairy">Dairy</option>
                        <option value="grains">Grains</option>
                        <option value="guilty-pleasures">
                            Guilty Pleasures
                        </option>
                        <option value="fruit">Fruit</option>
                        <option value="fish">Fish</option>
                        <option value="meat">Meat</option>
                        <option value="vegetables">Vegetables</option>
                    </select>
                    <textarea
                        key={3}
                        type="text"
                        placeholder="Information about the item, (e.g. condition, expiry date, to be picked up by)"
                        name="description"
                        rows="7"
                        maxLength="1000"
                    />
                    <input
                        key={4}
                        type="text"
                        placeholder="Address"
                        name="address"
                    />
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
        </div>
    );
}
