import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import Autocomplete from "../Autocomplete";

let data = require("./kladr.json");

let delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulate request delay
 */
function simulateFetch(value) {
    return delay(Math.floor(Math.random() * 2000))
        .then(() => filterByContain(value, data))
}

/**
 * Simulate server-side json api
 */
let filterByContain = (value, data) => {
    return data.filter(item => item.City.toLowerCase().indexOf(value.toLowerCase()) == 0);
}

let filterByAlphabet = data => {
    return data.sort((a, b) => {
        let cityA = a.City.toLowerCase();
        let cityB = b.City.toLowerCase();

        return cityA < cityB ? -1 : cityA > cityB ? 1 : 0;
    });
}

/*eslint-disable react/prop-types */
class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            data: null,
            selected: null
        }
    }

    render() {
        return (
            <Autocomplete
                value={this.state.value}
                queryValue="City"
                data={this.state.data}
                itemsCount={5}
                structure={this.props.structure}
                placeholder="Введите значение"
                onChange={this.handleChange}
                width={150}
                onSelect={this.handleSelect}
            />
        );
    }

    handleChange = async value => {
        if(!value) {
            return this.setState({ value: "", data: null });
        }

        this.setState({ value });

        let data = await simulateFetch(value);

        this.setState({ data: filterByAlphabet(data) });
    }

    handleSelect = selected => this.setState({ selected }) 
}

storiesOf("Autocomplete", module)
    .add("plain structure in list", () => <Demo structure={["City"]} />)
    .add("composite structure in list", () => <Demo structure={["Id", "City"]} />)
