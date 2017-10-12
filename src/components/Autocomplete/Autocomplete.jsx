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
        width: PropTypes.number,
        data: PropTypes.array,
        itemsCount: PropTypes.number,
        structure: PropTypes.array.isRequired
    }

    static defaultProps = {
        itemsCount: 6
    }

    constructor(props) {
        super(props);

        this.state = {
            opened: false
        }
    }

    renderListItem = item => {
        return this.props.structure.map((q, i) => (<div key={i}>{item[q]}</div>));
    }

    renderList = () => {
        let items = [], { data, itemsCount } = this.props;

        for(let i = 0; i < itemsCount; i++) {
            items.push(
                <div key={i} className={styles.list}>
                    { this.renderListItem(data[i]) }
                </div>
            );
        }

        return items;
    }

    render() {
        let { data } = this.props;

        return (
            <div className={styles.autocomplete}>
                <Input
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onKeyDown={this.handleKeyDown}
                    width={this.props.width}
                    refNode={this.refNode}
                />
                <Dropdown
                    anchor={this.input}
                    opened={this.state.opened}
                    width={this.props.width + 30}
                    margin={2}
                >
                    { data && this.renderList() }
                </Dropdown>
            </div>
        );
    }

    handleChange = e => {
        this.setState({ opened: !!e.target.value });
        this.props.onChange(e);
    }

    handleFocus = e => {
        if(e.target.value) this.setState({ opened: true })
    }

    handleBlur = () => this.setState({ opened: false })

    handleKeyDown = () => {}

    refNode = node => this.input = node
}
