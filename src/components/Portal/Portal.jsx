import { Component } from "react";
import ReactDOM from "react-dom";

export default class Portal extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement("div");
    }

    componentDidMount() {
        document.body.appendChild(this.container);
    }

    componentWillUnmount() {
        document.body.removeChild(this.container);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.container
        );
    }
}
