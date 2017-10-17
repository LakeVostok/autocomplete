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
        width: PropTypes.number,
        /**
         * Url to fetch or array of data
         */
        data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
        /**
         * The key in data by which will be filtering occur
         */
        queryValue: PropTypes.string.isRequired,
        itemsCount: PropTypes.number
    }

    static defaultProps = {
        itemsCount: 6
    }

    constructor(props) {
        super(props);

        this.state = {
            value: "",
            opened: false,
            data: null,
        }

        this.throttledUpdate = throttle(this.updateData, 5000);
    }

    componentWillMount() {
        let { data } = this.props;

        switch(getType(data)) {
        case "Array":
            this.getData = (value, queryValue, itemsCount) => {
                return Promise.resolve(data)
                    .then(data => filterItems(data, value, queryValue, itemsCount));
            }
            break;
        case "String":
            this.getData = (value, queryValue, itemsCount) => {
                return fetch(`${data}?${queryValue}=${value}`)
                    .then(res => res.json())
                    .then(data => filterItems(data, value, queryValue, itemsCount))
            }
            break;
        default: throw new Error(`Wrong data type ${data}`);
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
                        <ListElements data={this.state.data} queryValue={this.props.queryValue} />
                    </List>
                    <NotFound />
                </Dropdown>
            </div>
        );
    }

    handleChange = value => {
        this.setState({ value, data: null }, this.throttledUpdate);
    }

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

    updateData = async () => {
        if(!this.state.value) return;

        let { queryValue, itemsCount } = this.props;

        let data = await this.getData(this.state.value, queryValue, itemsCount);

        this.setState({ data });
    }

    refNode = node => this.input = node
}

function filterItems(data, value, queryValue, itemsCount) {
    let isEqual = item => item[queryValue]
        .toLowerCase()
        .indexOf(value.toLowerCase()) == 0;

    let compare = (a, b) => {
        let itemA = a[queryValue].toLowerCase();
        let itemB = b[queryValue].toLowerCase();

        return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
    };

    return data.filter(isEqual).sort(compare).slice(0, itemsCount);
}

function ListElements({data, queryValue}) {
    return data && data.length ? (
        data.map((item, index) => (
            <ListItem dataset={item} key={index}>
                { item[queryValue] }
            </ListItem>)
        )
    ) : null;
}

ListElements.propTypes = {
    data: PropTypes.array,
    queryValue: PropTypes.string
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

function getType(data) {
    return ({}).toString.call(data).slice(8, -1);
}

function throttle(callback, delay) {
    let isThrottled = false, args, context;

    function wrapper() {
        if (isThrottled) {
            args = arguments;
            context = this;
            return;
        }

        isThrottled = true;
        callback.apply(this, arguments);

        setTimeout(() => {
            isThrottled = false;
            if (args) {
                wrapper.apply(context, args);
                args = context = null;
            }
        }, delay);
    }

    return wrapper;
}
