import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Input.scss";

import Icon from "../Icon";

export default class Input extends Component {
    constructor() {
        super();
        this.className="";
    }

    componentWillMount() {
        let { iconPosition } = this.props;

        switch(iconPosition) {
            case "right":
                this.className = "padding-right";
                break;
            case "left":
                this.className = "padding-left";
                break;
        }
    }

    render() {
        let {refNode, iconName, iconPosition, error, ...props} = this.props;

        return (
            <span className="input__wrapper">
                <input
                    className={`input ${this.className} ${error ? "error" : ""}`}
                    ref={refNode}
                    {...props}
                />
                {
                    iconName && <span className="input__icon" style={{ [iconPosition]: 10 }}>
                        <Icon name={iconName}/>
                    </span>
                }
            </span>
        );
    }
}

Input.propTypes = {
    /**
     * Value of input
     */
    value: PropTypes.string,

    /**
     * Placeholder of input
     */
    placeholder: PropTypes.string,

    /**
     * Error state
     */
    error: PropTypes.bool,

    /**
     * Disabled state 
     */
    disabled: PropTypes.bool,

    /**
     * Focus event handler
     */
    onFocus: PropTypes.func,

    /**
     * Blur event handler
     */
    onBlur: PropTypes.func,

    /**
     * Change event handler
     */
    onChange: PropTypes.func,

    /**
     *  KeyDown event handler
     */
    onKeyDown: PropTypes.func,

    /**
     * Function, that return link on input
     */
    refNode: PropTypes.func,

    /**
     * Name of inner icon
     */
    iconName: PropTypes.string,

    /**
     * Position of inner icon
     */
    iconPosition: PropTypes.string
};