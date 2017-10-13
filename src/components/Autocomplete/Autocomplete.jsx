import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Autocomplete.scss";

import Input from "../Input";
import Dropdown from "../Dropdown";
import { List, ListItem } from "../List";

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
            opened: false,
            highlightedIndex: 0
        }
    }

    renderListItemContent = item => {
        return this.props.structure.map((q, i) => (<div key={i}>{item[q]}</div>));
    }

    renderListItems = () => {
        let { data, itemsCount } = this.props;
        data.splice(itemsCount);

        return data.map((item, i) => <ListItem key={i}>{this.renderListItemContent(item)}</ListItem>);
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
                    opened={this.state.opened && !!data}
                    width={this.props.width + 30}
                    margin={2}
                >
                    <List
                        highlighted={this.state.highlightedIndex}
                        ref={component => this.list = component}
                    >
                        { data && this.renderListItems() }
                    </List>
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

    handleKeyDown = e => {
        switch (e.keyCode) {
        case 38:
            this.list.down();
            break;
        case 40:
            this.list.up();
            break;
        case 13:
            //enter
            break;
        case 27:
            //escape
            break;
        }
    }

    refNode = node => this.input = node
}
