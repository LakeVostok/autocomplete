import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Autocomplete.scss";

import Input from "../Input";
import Dropdown from "../Dropdown";
import { List, ListItem } from "../List";
import Loader from "../Loader";

export default class Autocomplete extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        width: PropTypes.number
    }

    constructor(props) {
        super(props);

        this.state = {
            value: "",
            opened: false
        }
    }

    render() {
        return (
            <div className={styles.autocomplete}>
                <Loading />
                <Input
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    //onKeyDown={this.handleKeyDown}
                    width={this.props.width}
                    refNode={this.refNode}
                />
                <Dropdown
                    anchor={this.input}
                    opened={this.state.opened}
                    width={this.props.width}
                    margin={2}
                >
                    <List
                        //onSelect={this.handleSelect}
                        //highlighted={this.state.highlightedIndex}
                        ref={component => this.list = component}
                    >
                        <ListItem />
                    </List>
                    <NotFound />
                </Dropdown>
            </div>
        );
    }

    handleChange = value => this.setState({ value })

    handleFocus = () => this.setState({ opened: true })

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

function Loading({loading}) {
    return loading ? (
        <div className={styles.loading}>
            <Loader />
        </div>
    ) : null;
}

Loading.propTypes = {
    loading: PropTypes.bool
};

function NotFound({display}) {
    return display ? (
        <div className={styles.notFound}>Не найдено</div>
    ) : null;
}

NotFound.propTypes = {
    display: PropTypes.bool
};
