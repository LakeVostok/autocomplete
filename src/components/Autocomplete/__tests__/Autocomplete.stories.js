import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import Autocomplete from "../Autocomplete";

let data = require("./kladr.json");

/*eslint-disable react/prop-types */
class Demo extends Component {
    render() {
        return (
            <Autocomplete
                placeholder="Введите значение"
                width={300}
                data={this.props.data}
                queryValue={this.props.queryValue}
                itemsCount={5}
            />
        );
    }
}

storiesOf("Autocomplete", module)
    .add("Static data", () => <Demo data={data} queryValue="City" />)
    .add("Dynamically loaded data", () => <Demo data="http://localhost:8081/searchcity" queryValue="City" />)
