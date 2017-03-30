import React, { Component } from 'react';
import './Dropdown.scss';

const Dropdown = (props) => <ul {...props}>{props.children}</ul>;

export default Dropdown;