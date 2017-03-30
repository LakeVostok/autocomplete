import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import './App.scss';

import Autocomplete from '../components/Autocomplete'; 
import * as autocompleteActions from '../actions/autocompleteActions';


class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let actions = { ...this.props.autocompleteActions};
    let { element1, element2 } = this.props.autocomplete;
    
    return (
      <div>
        <button onClick={()=>console.log(this.props)}>Show state</button>
        <Autocomplete id="element1" type="autocomplete--input"  { ...element1 } { ...actions } />
        <Autocomplete id="element2" type="autocomplete--select" { ...element2 } { ...actions } />
      </div>
    );
  }


}

function mapStateToProps(state) {
  return {
    autocomplete: state.autocomplete
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autocompleteActions: bindActionCreators(autocompleteActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);