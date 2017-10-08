import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import Dropdown from "../Dropdown";

class Demo extends Component {
    constructor() {
        super();

        this.state = {
            opened: false
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>toggle</button>
                <input ref={input => this.input = input} />
                <Dropdown
                    anchor={this.input}
                    opened={this.state.opened}
                    margin={3}
                    width={300}
                >
                    content
                </Dropdown>
            </div>
        );
    }

    handleClick = () => this.setState({ opened: !this.state.opened })
}
storiesOf("Dropdown", module)
    .add("without props", () => <Demo />)
