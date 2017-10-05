import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Autocomplete.scss";

import Input from "../Input";
import Dropdown from "../Dropdown";

export default class Autocomplete extends Component {
    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        width: PropTypes.number
    }

    constructor(props) {
        super(props);

        this.state = {
            opened: false
        }
    }

    render() {
        return (
            <div className={styles.autocomplete}>
                <Input
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    width={this.props.width}
                    refNode={this.refNode}
                />
                <Dropdown
                    anchor={this.input}
                    opened={this.state.opened}
                    width={this.props.width + 30}
                    margin={2}
                >
                
                </Dropdown>
            </div>
        );
    }

    refNode = node => this.input = node
}
