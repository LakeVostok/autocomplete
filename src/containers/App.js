import React, { Component } from 'react';

import './App.scss';

import Autocomplete from '../components/Autocomplete.jsx'; 


export default class App extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div>
        <Autocomplete id="my1" type="autocomplete--input" url="static/kladr.json"/>
        <Autocomplete id="my2" type="autocomplete--select" url="static/kladr.json"/>
      </div>
    );
  }
}