import React, { useState } from "react";
// import useForm from "react-hook-form";
import axios from "./axios";

function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value,
            [target.file]: target.file,
        });
        console.log("Typing:", values);
    };

    return [values, handleChange];
    console.log("values", values);
}

function useImputSubmit(url, values) {
    const [error, setError] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("INSIDE useImputSubmit", values);
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

export default function UploadProduct() {
    const [values, handleChange] = useStatefulFields();
    const [handleSubmit, error] = useImputSubmit("/post/offer", values);

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Share Your Item</h2>
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
                    <option value="guilty-pleasures">Guilty Pleasures</option>
                    <option value="fruit">Fruit</option>
                    <option value="fish">Fish</option>
                    <option value="meat">Meat</option>
                    <option value="vegetables">Vegetables</option>
                </select>
                <textarea
                    key={3}
                    type="text"
                    placeholder="Information about the item, (e.g. condition, expiry date)"
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
        </>
    );
}
