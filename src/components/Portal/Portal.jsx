import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.container = document.createElement("div");
    }

    render() {
        return null;
    }
    
    renderChildren() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this, 
            this.props.children, 
            this.container
        );
    }
    
    componentWillMount() {
        document.body.appendChild(this.container);
    }

    componentDidMount() {
        this.renderChildren();
    }

    componentDidUpdate() {
        this.renderChildren();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.container);
        this.container.parentNode && this.container.parentNode.removeChild(this.container);
    }
}

Portal.propTypes = {
    /**
     * Content of Portal
     */
    children: PropTypes.element.isRequired
};
