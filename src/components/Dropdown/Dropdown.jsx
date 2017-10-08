import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Dropdown.scss";

import Portal from "../Portal";

export default class Dropdown extends Component {
    static propTypes = {
        opened: PropTypes.bool,
        anchor: PropTypes.node,
        width: PropTypes.number,
        margin: PropTypes.number
    }

    componentWillReceiveProps(props) {
        let coordinates = this.getCoordinates(props.anchor);

        this.setState({
            left: coordinates.left,
            top: coordinates.top
        });
    }

    render() {
        if(!this.props.opened) return null;

        let { left, top } = this.state;
        let { width, children } = this.props;

        return (
            <Portal>
                <div className={styles.dropdown} style={{ left, top, width }}>
                    {children}
                </div>
            </Portal>
        );
    }

    getCoordinates = element => {
        let rect = element.getBoundingClientRect();
        let view = document.documentElement;

        let left = rect.left + window.pageXOffset - view.clientLeft;
        let top = rect.top + rect.height + this.props.margin + window.pageYOffset - view.clientTop;

        return { left, top };
    }
}
