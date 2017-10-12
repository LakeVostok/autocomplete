import React from "react";
import renderer from "react-test-renderer";
import Input from "../Input";

describe("Input", () => {
    test("empty", () => {
        const tree = renderer
            .create(<Input />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("with 'error' class", () => {
        const tree = renderer
            .create(<Input error />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("with with the specified width", () => {
        const tree = renderer
            .create(<Input width={100} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})
