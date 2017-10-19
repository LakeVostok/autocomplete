import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Main from "./Demo/Main.js";

ReactDOM.render(
    <AppContainer>
        <Main />
    </AppContainer>,
    document.getElementById("root")
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept("./Main", () => {
        const NextApp = require("./Main").default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById("root")
        );
    });
}
