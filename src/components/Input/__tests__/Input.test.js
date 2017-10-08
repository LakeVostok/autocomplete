import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import Input from "../Input";

describe("Input", () => {
    describe("Snapshots", () => {
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

    describe("Interaction", () => {
        it("value from props is displayed correctly", () => {
            let actualValue = "value";
            const wrapper = shallow(<Input value={actualValue} />);
            expect(wrapper.find("input").get(0).props.value).toBe(actualValue);
        })

        it("if 'error' prop is specified, input get error className", () => {
            const wrapper = mount(<Input />);
            expect(wrapper.find("input").hasClass("error")).toBe(false);

            wrapper.setProps({ error: true });
            expect(wrapper.find("input").hasClass("error")).toBe(true);
        })
    })
})
