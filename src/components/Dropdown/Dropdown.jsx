import React, { Component } from "react";

import Popup from "../Popup";

export default class DropDown extends Component {
    render() {
        let { children, ...props } = this.props;

        return <Popup
                    positions={["bottom left", "top left"]}
                    margin={2}
                    offset={0}
                    onClickOutside={() => {}}
                    onFocusOutside={() => {}}
                    {...props}
                >
                    {children}
                </Popup>
    }
}