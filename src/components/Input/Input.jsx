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
        error: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onKeyDown: PropTypes.func
    }

    render() {
        let { error, width } = this.props;

        let className = styles.input;
        if(error) className += " " + styles.error;

        return (
            <input
                ref={this.props.refNode}
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onKeyDown={this.props.onKeyDown}
                className={className}
                style={{width}}
            />
        );
    }
}
