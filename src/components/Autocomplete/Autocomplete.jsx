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
        structure: PropTypes.array.isRequired,
        queryValue: PropTypes.string.isRequired,
        onSelect: PropTypes.func
    }

    static defaultProps = {
        itemsCount: 6
    }

    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            highlightedIndex: 0,
            selected: null
        }
    }

    renderListItemContent = item => {
        return this.props.structure.map((q, i) => (<div key={i}>{item[q]}</div>));
    }

    renderListItems = () => {
        let { data, itemsCount } = this.props;
        data.splice(itemsCount);

        return data.map((item, i) => <ListItem key={i} dataset={item}>{this.renderListItemContent(item)}</ListItem>);
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
                        onSelect={this.handleSelect}
                        highlighted={this.state.highlightedIndex}
                        ref={component => this.list = component}
                    >
                        { data && this.renderListItems() }
                    </List>
                </Dropdown>
            </div>
        );
    }

    handleChange = value => {
        this.setState({ opened: !!value });
        this.props.onChange(value);
    }

    handleFocus = e => {
        if(e.target.value) this.setState({ opened: true })
    }

    handleBlur = () => this.setState({ opened: false })

    handleSelect = selected => {
        let { queryValue } = this.props;

        this.props.onChange(selected[queryValue]);
        this.props.onSelect(selected);

        this.setState({ selected });
    }

    handleKeyDown = e => {
        switch (e.keyCode) {
        case 38:
            this.list.down();
            break;
        case 40:
            this.list.up();
            break;
        case 13:
            this.handleSelect(this.list.selected);
            break;
        case 27:
            this.setState({ opened: false });
            break;
        }
    }

    refNode = node => this.input = node

    get selected() {
        return this.state.selected;
    }
}
