import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Input.scss";

export default class Input extends Component {
    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        width: PropTypes.number
    }

    render() {
        let style = {
            width: this.props.width + "px"
        };

        return (
            <input
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                className={styles.input}
                style={style}
            />
        );
    }
}
