import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import axios from "axios";
import throttle from "../../lib/throttle";

import "./Autocomplete.scss";

import Input from "../Input";
import Loader from "../Loader";
import Dropdown from "../Dropdown";
import ScrollContainer from "../ScrollContainer";

class NotFound extends Component {
    render() {
        return (
            <div className="autocomplete__not-found" data-system>Не найдено</div>    
        );
    }
}

class Prompt extends Component {
    render() {
        let { type, children } = this.props;

        return (
            <div className={"prompt " + type}>{ children }</div>
        );
    }
}

class ErrorItem extends Component {
    render() {
        return (
            <div className="autocomplete__error" data-system>
                <div className="autocomplete__error--refresh-text">Что-то пошло не так. Проверьте соединение с интернетом и попробуйте ещё раз</div>
                <div onMouseDown={() =>location.reload()} className="autocomplete__error--refresh-button">Обновить</div>
            </div>
        );
    }
}

class CounterItems extends Component {
    render() {
        return (
            <div
                className="autocomplete__counter"
                data-system
            >
                Показано {this.props.showed} из {this.props.amount} найденных городов. Уточните запрос, чтобы увидеть остальные
            </div>
        );
    }
}

export default class Autocomplete extends Component {
   static defaultProps = {
      showed: 5,
      onSelect: () => {}
   }
  
    constructor() {
        super();

        this.state = {
            opened: false,
            loading: false,
            showLoader: false,
            error: false,
            value: "",
            data: null,
            amount: null,
            selected: null,
            selectedIndex: null,
            highlightedIndex: 0,
            isValid: true
        };
    }

    componentWillMount() {
        function counter() {
            let count = this.props.arrow ? 21 : 5;

            let increase = () => count += 7;
            let get = () => count;
            let reset = () => count = this.props.arrow ? 21 : 5;
            
            return { increase, get, reset };
        }

        this.requestItemsCount = counter.call(this);
        this.handleFocus = this.props.arrow ? this.withArrowFocusHandler : this.withoutArrowFocusHandler;
        this.throttleKeyDown = throttle(this.handleKeyDown, 200);
        this.mouseDownHappened = false;
    }

    componentDidMount() {
        this.width = this.input.getBoundingClientRect().width + 30;
    }

    renderToDropdown = element => <div className="autocomplete__dropdown" style={{ width: this.width }} onMouseDown={this.handleMouseDown}>{ element }</div>;

    renderList = () => {
        if(this.state.error) return this.renderToDropdown(<ErrorItem />);
        if(this.state.loading) return;
        if(this.state.value && this.state.data && !this.state.data.length) return this.renderToDropdown(<NotFound />);
        if(!this.state.data) return null;

        let elements =  this.state.data.map((item, index) => {
            let className;

            if(index == this.state.selectedIndex) className = "selected";
            if(index == this.state.highlightedIndex) className = "highlighted";

            return <div key={index} className={className}>{item[this.props.queryValue]}</div>;
        });

        return this.renderToDropdown(this.props.arrow
            ? this.withArrow(elements)
            : this.withoutArrow(elements)
        );
    }

    renderToList = element => <div className="autocomplete__list" onMouseOver={this.handleMouseOver}>{ element }</div>

    withoutArrow = elements => {
        if(this.state.amount > this.props.showed) elements.push(<CounterItems key="counter" showed={this.props.showed} amount={this.state.amount}/>);
        return this.renderToList(elements);
    }

    withArrow = elements => {
        let container = this.renderToList(elements);
        return <ScrollContainer onScrollBottom={this.appendOnScroll} scrollTo={this.state.highlightedIndex || 0}>{ container }</ScrollContainer>;
    }

    render() {
        let iconName = this.props.arrow 
            ? this.state.showLoader ? "" : "caret-bottom"
            : "";

        return (
            <div className="autocomplete">
                { !this.state.isValid && <Prompt type="invalid">Выберите значение из списка</Prompt> }
                <Input 
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    error={!this.state.isValid}
                    disabled={this.props.disabled}
                    width={this.props.width}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onKeyDown={e => this.throttleKeyDown(e.keyCode)}
                    refNode={node => this.input = node}
                    iconName={iconName}
                    iconPosition="right"
                />
                <div className="autocomplete__loader">
                    { this.state.showLoader && <Loader /> }
                </div>
                <Dropdown
                    opened={this.state.opened}
                    anchor={this.input}
                >
                { this.renderList() }
                </Dropdown>
            </div>
        );
    }

    showLoader = () => {
        let that = this;
        
        setTimeout(function run() {
            if(!that.state.loading || that.state.error) {
                that.setState({ showLoader: false });
                return null;
            }

            that.setState({ showLoader: true }, () => setTimeout(run, 1000));
        }, 500);
    }

    pick = offset => {
        if(!this.state.data) return;
        
        let total = this.state.data.length;
        let current = this.state.highlightedIndex;

        if(offset < 0 && current == 0 || offset > 0 && current == total - 1) return;

        let next = (current + offset) % total;
        
        this.setState({ highlightedIndex: next });
    }

    up = () => this.pick(1)

    down = () => this.pick(-1)

    openDropdown = () => ({ opened: true })

    closeDropdown = () => ({ opened: false })

    finalize = isValid => ({ isValid, ...this.closeDropdown() })

    select = (value, selected, selectedIndex) => {
        this.props.onSelect(selected);
        return ({ value, selected, selectedIndex });
    }

    handleKeyDown = keyCode => {
        switch (keyCode) {
            case 38:
                this.down();
                break;
            case 40:
                this.up();
                break;
            case 13:
                if(this.state.data && this.state.opened && !this.state.loading && !this.state.error) {
                    let selected = this.state.data[this.state.highlightedIndex];
                    let value = selected[this.props.queryValue];

                    this.setState(state => {
                        return { ...this.select(value, selected, state.highlightedIndex), ...this.finalize(true) };
                    });
                }
                break;
            case 27:
                this.setState(this.closeDropdown);
                break;
        }
    }

    handleMouseDown = e => {
        if(e.target.dataset.system) return null;
        this.mouseDownHappened = true;

        let targetIndex = [].indexOf.call(e.target.parentNode.children, e.target);
        let selected = this.state.data[targetIndex];
        let value = selected[this.props.queryValue];

        this.setState({ ...this.select(value, selected, targetIndex), ...this.finalize(true) });
    }

    handleMouseOver = e => {
        if(e.target.dataset.system) return null;

        let targetIndex = [].indexOf.call(e.target.parentNode.children, e.target);
        this.setState({ highlightedIndex: targetIndex });
    }

    handleBlur = () => {
        if(this.mouseDownHappened) {
            this.input.focus();
            this.mouseDownHappened = false;
        }

        if(!this.state.value || !this.state.data) {
            return this.setState(() => this.finalize(false));
        }

        if(!this.state.selected && this.state.data.length && this.state.value == this.state.data[this.state.highlightedIndex][this.props.queryValue]) {
            let selected = this.state.data[this.state.highlightedIndex];
            let { value, highlightedIndex } = this.state;

            return this.setState(state => ({ ...this.select(value, selected, highlightedIndex), ...this.finalize(true) }));
        }

        if(this.state.selected && this.state.value == this.state.selected[this.props.queryValue]) {
            return this.setState(() => this.finalize(true));
        }

        return this.setState(() => this.finalize(false));
    }

    handleRequest = (url, queryValue, value, count) => axios.get(url, {
        params: { [queryValue]: value, count }
    })

    fetchData = (url, queryValue, value, count) => {
        return Promise.resolve()
            .then(() => this.setState({ value, loading: true, ...this.openDropdown() }, () => this.showLoader()))
            .then(() => this.handleRequest(url, queryValue, value, count))
            .catch(() => this.setState({ error: true }));
    }

    resetSelected = () => ({ highlightedIndex: 0, selected: null, selectedIndex: null })

    updateData = (data, amount) => ({ data, amount, loading: false, ...this.resetSelected()})

    handleChange = e => {
        let value = e.target.value;

        if(!value && !this.props.arrow) return this.setState({ value, data: null });

        this.fetchData(this.props.url, this.props.queryValue, value, this.requestItemsCount.get())
            .then(res => this.setState(() => this.updateData(res.data.result, res.data.length)))
        
        this.requestItemsCount.reset();
    }

    withArrowFocusHandler = () => {
        this.input.select();
    
        if(this.state.selectedIndex) this.setState({ highlightedIndex: this.state.selectedIndex });
    
        if(this.state.data) return this.setState(this.openDropdown);

        this.fetchData(this.props.url, this.props.queryValue, this.state.value,  this.requestItemsCount.get())
            .then(res => this.setState(() => this.updateData(res.data.result, res.data.length)))
    }

    withoutArrowFocusHandler =() => {
        this.input.select();
        
        let value = this.state.value;
        
        if(!value || this.state.selected && value == this.state.selected[this.props.queryValue]) return;
    
        this.fetchData(this.props.url, this.props.queryValue, value, this.requestItemsCount.get())
            .then(res => this.setState(() => this.updateData(res.data.result, res.data.length)))
    }

    appendOnScroll = () => {
        if(this.state.selected) return;
    
        if(this.state.amount < this.requestItemsCount.get()) return;
        this.requestItemsCount.increase();
    
        axios.get(this.props.url, {
                params: {
                    [this.props.queryValue]: this.state.value,
                    count: this.requestItemsCount.get()
                }
            })
            .then(res => this.setState({ data: res.data.result, amount: res.data.length }))
    }

    getValue = () => this.state.selected

    isValid = () => this.state.isValid
}

Autocomplete.propTypes = {
    /**
     * Placeholder for input element
     */
    placeholder: PropTypes.string,
    
    /**
     * Width of input element
     */
    width: PropTypes.number,

    /**
     * url from which the data will be downloaded
     */
    url: PropTypes.string,

    /**
     * Type of autocomplete (with or without arrow)
     */
    arrow: PropTypes.bool,

    /**
     * The field on which to search
     */
    queryValue: PropTypes.string,

    /**
     * The function that will be called when data is selected
     */
    onSelect: PropTypes.func
};