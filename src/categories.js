import React from "react";

export class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "guilty-pleasures" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert("Type of product: " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick type of item:
                    <select
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
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
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
