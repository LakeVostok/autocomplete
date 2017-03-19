import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.scss';

import AutocompleteInput from '../components/AutocompleteInput/AutocompleteInput.jsx';

import * as pageActions from '../actions/PageActions';
import * as interfaceActions from '../actions/interfaceActions';

class App extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const { city, ui } = this.props;
    const { loadCities, showState, inputValue, searchCity, cleanEqualNames, setResult } = this.props.pageActions;
    const { setFocus, unsetFocus, showHint, hideHint, loaderOn, loaderOff, setError } = this.props.interfaceActions;

    
    return (
      <div className="react-wrapper">
        <AutocompleteInput
          url =          "static/kladr.json"
          value =        {city.value}
          onChange =     {inputValue}
          onFocus =      {setFocus}
          onBlur =       {unsetFocus}
          isFocused =    {ui.isFocused}
          isHidden =     {ui.isHidden}
          showHint =     {showHint}
          hideHint =     {hideHint}
          
          loadCities =   {loadCities}
          cities =       {city.cities}
          setResult =    {setResult}
          result =       {city.result}
          
          loaderOn =     {loaderOn}
          loaderOff =    {loaderOff}
          loaderVisible= {ui.loaderVisible}
          
          loaded=       {city.loaded}
          
          setError={setError}
          error={ui.error}
          
          
          
          
          equalNames =   {city.equalNames}
          cleanEqualNames={cleanEqualNames}



           
          loadHandler= { loadCities } state={city}>
          Начните вводить код или название
        </AutocompleteInput>
        
      <button onClick={showState}>show state</button>

        
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    city: state.city,
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    interfaceActions: bindActionCreators(interfaceActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);