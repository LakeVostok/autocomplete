import React, { Component } from 'react';
import './DropdownList.scss';
import Option from './Option/Option.jsx';

export default class DropdownList extends Component {
  

    render() {
        return (
            <select>
              <option ></option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
        );
    }
}