import React from "react";
import { storiesOf } from "@storybook/react";
import Input from "../Input";

const styles = {
    width: 400,
};

const WidthDecorator = storyFn => (
    <div style={styles}>
        { storyFn() }
    </div>
);

storiesOf("Input", module)
    .addDecorator(WidthDecorator)
    .add("Normal", () => <Input />)
    .add("Error", () => <Input error />)
    .add("With placeholder", () => <Input placeholder="placeholder" />)
    .add("With manualy setted width", () => <Input width={100} />)
