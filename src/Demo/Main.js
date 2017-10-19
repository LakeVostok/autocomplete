import React, { Component } from "react";
import Autocomplete from "../components/Autocomplete";
import "./Main.scss";

const data = require("./kladr.json");

export default class Main extends Component {
    render() {
        return (
            <div>
                <div className="selected">
                    Выбрано:
                    <pre> {this.selected}</pre>
                </div>
                <hr className="divider" />
                <Autocomplete
                    placeholder="Начните вводить название города"
                    data={data}
                    queryValue="City"
                    itemsCount={5}
                    width={300}
                    onSelect={this.handleSelect}
                />
            </div>
        );
    }

    handleSelect = selected => {
        this.selected = JSON.stringify(selected);
        this.forceUpdate();
    }
}
