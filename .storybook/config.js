import "babel-polyfill";
import { configure } from "@storybook/react";

const req = require.context("../src/components", true, /.stories.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename) || null);
}

configure(loadStories, module);