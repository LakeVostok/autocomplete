import React, { Component } from "react";
import Autocomplete from "./components/Autocomplete";

const data = require("./kladr.json");

export default class Main extends Component {
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "100" }}>
                <Autocomplete
                    placeholder="Начните вводить название города"
                    data={data}
                    queryValue="City"
                    itemsCount={5}
                    width={300}
                />
            </div>
        );
    }
}
