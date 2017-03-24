import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as inputActions from '../actions/inputActions';

import './Input.scss';

class Input extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      let { inputValue, onFocus, onBlur } =  this.props.inputActions;
      let { value, focused } = this.props.input;
      let { id, placeholder } = this.props;
      
      let className = `autocomplete__input ${ focused ? 'autocomplete__input--focused' : '' }`;

      return (
        <label>
          <input className = { className }
            value =          { value.id }
            onChange =       { e => inputValue(id, e) } 
            onFocus =        { e => onFocus(id, e) } 
            onBlur =         { e => onBlur(id) }
            placeholder =    { placeholder }/>
        </label>
      );
    }

}

function mapStateToProps(state) {
  return {
    input: state.input
  };
}

function mapDispatchToProps(dispatch) {
  return {
    inputActions: bindActionCreators(inputActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);