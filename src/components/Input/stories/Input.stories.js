import React from "react";
import { storiesOf } from "@storybook/react";
import Input from "../Input";

storiesOf("Input", module)
    .add("with value and width", () => <Input width={200} value="test" />)
