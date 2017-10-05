import React from 'react';
import { configure, addDecorator } from '@storybook/react';

addDecorator(story =>
  <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
    {story()}
  </div>
);

const req = require.context('../src/components', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename) || null);
}

configure(loadStories, module);