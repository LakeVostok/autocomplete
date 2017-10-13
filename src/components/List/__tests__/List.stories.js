import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { List, ListItem } from "../List";

class Demo extends Component {
    render() {
        return (
            <List>
                <ListItem>item 1</ListItem>
                <ListItem>item 2</ListItem>
                <ListItem>item 3</ListItem>
                <ListItem>item 4</ListItem>
            </List>
        );
    }
}
storiesOf("List", module)
    .add("without props", () => <Demo />)
