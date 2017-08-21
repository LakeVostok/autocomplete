import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

export default class Collector extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside, true);
        document.addEventListener("focus", this.handleFocusOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside, true);
        document.removeEventListener("focus", this.handleFocusOutside, true);
    }
    
    checkOutsideEvent = (event, cb) => !findDOMNode(this).contains(event.target) && cb(event)

    handleClickOutside = e => this.checkOutsideEvent(e, this.props.onClickOutside)
    
    handleFocusOutside = e => this.checkOutsideEvent(e, this.props.onFocusOutside)
    
    render() {
        return React.Children.only(this.props.children);
    }
}

Collector.propTypes = {
    /**
     * Callback that is called when happens click outside of the component 
     */
    onClickOutside: PropTypes.func.isRequired,
    
    /**
     * Callback that is called when happens focus outside of the component 
     */
    onFocusOutside: PropTypes.func.isRequired,
    
    /**
     * Content of Collector 
     */
    children: PropTypes.element.isRequired
};
