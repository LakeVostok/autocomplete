import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./List.scss";

export class ListItem extends Component {
    static propTypes = {
        highlighted: PropTypes.bool
    }

    render() {
        let { highlighted, children } = this.props;

        let className = styles.item;
        if(highlighted) className += " " + styles.highlighted;

        return (
            <li className={className}>{children}</li>
        );
    }
}

export class List extends Component {
    static propTypes = {
        highlighted: PropTypes.number
    }

    constructor(props) {
        super(props);

        this.state = {
            highlighted: this.props.highlighted
        }
    }

    componentWillReceiveProps() {
        this.setState({ highlighted: 0 });
    }

    render() {
        let { children } = this.props;
        let { highlighted } = this.state;

        return (
            <ul
                className={styles.list}
                onMouseOver={this.handleMouseOver}
            >
                {
                    React.Children.map(children, (item, index) => {
                        return index == highlighted
                            ? React.cloneElement(item, { highlighted: true })
                            : item
                    })
                }
            </ul>
        );
    }

    handleMouseOver = e => {
        let target = e.target.closest("li");
        let targetIndex = [].indexOf.call(target.parentNode.children, target);

        this.setState({ highlighted: targetIndex })
    }

    pick = offset => {
        let total = React.Children.count(this.props.children);
        let current = this.state.highlighted;

        let next = (current + offset + total) % total;
        
        this.setState({ highlighted: next });
    }

    up = () => this.pick(1)

    down = () => this.pick(-1)
}
