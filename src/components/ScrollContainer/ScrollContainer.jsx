import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

export default class ScrollContainer extends Component {
    componentDidMount() {
        this.container = findDOMNode(this);
        this.container.addEventListener("wheel", this.handleWheel);

        let item = this.container.children[this.props.scrollTo];

        this.container.scrollTop = item.offsetTop;
    }

    componentDidUpdate() {
        let item = this.container.children[this.props.scrollTo];

        if(!item) return;

        if(item.offsetTop < this.container.scrollTop) {
            this.container.scrollTop -= item.clientHeight;
        }

        if(item.offsetTop + item.clientHeight > this.container.scrollTop + this.container.clientHeight) {
            this.container.scrollTop += item.clientHeight;
        }

        this.scrollBarAtBottom(this.container) && this.props.onScrollBottom();
    }

    componentWillUnmount() {
        this.container.removeEventListener("wheel", this.handleWheel);
    }

    render() {
        return React.Children.only(this.props.children);
    }

    scrollBarAtBottom = node => node.scrollTop + node.clientHeight >= node.scrollHeight

    handleWheel = e => {
        this.container.scrollTop += (e.wheelDelta < 0 ? 1 : -1) * 50;
        e.preventDefault();
        this.scrollBarAtBottom(this.container) && this.props.onScrollBottom();
    }
}

ScrollContainer.propTypes = {
    /**
     * Function that calls when the scroll reaches the bottom
     */
    onScrollBottom: PropTypes.func,

    /**
     * The number of the item to which the container should scroll
     */
    scrollTo: PropTypes.number
};