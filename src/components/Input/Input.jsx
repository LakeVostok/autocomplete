import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Input.scss";

export default class Input extends Component {
    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        width: PropTypes.number,
        refNode: PropTypes.func,
        error: PropTypes.bool
    }

    render() {
        let { error } = this.props;

        let className = `${styles.input} ${error ? styles.error : ""}`;

        let style = {
            width: this.props.width + "px"
        };

        return (
            <input
                ref={this.props.refNode}
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                className={className}
                style={style}
            />
        );
    }
}
