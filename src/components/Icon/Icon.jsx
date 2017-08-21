import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Icon.scss";

export default class Icon extends Component {
    constructor() {
        super();
        
        this.names = {
            "caret-top": "\ue04d",
            "caret-bottom": "\ue04c"
        };
    }

    render() {
        let icon = this.names[this.props.name];

        if(!icon) throw new Error(`Can not find icon ${this.props.name}`);

        return (
            <span className="icon">{icon}</span>
        );
    }
}

Icon.propTypes = {
    /**
     * Icon name
     */
    name: PropTypes.string.isRequired
};