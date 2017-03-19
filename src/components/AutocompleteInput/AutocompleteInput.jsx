import React, { Component } from 'react';
import './AutocompleteInput.scss';
import Tooltip from './Tooltip.jsx';

export default class AutocompleteInput extends Component {
    constructor(props) {
        super(props);
        this.result=false;
        this.selected=0;
    }
    changeHandler(e) {

        let { value, onChange, loaderOn, loaderOff, loaderVisible, loaded, cities, setResult } = this.props;
        
        onChange(e.target.value);
        
        if(!loaderVisible){
            setTimeout(function(){
                console.log('loader on');
                loaderOn();
            }, 500)
        }
    }
    
    keyBoardHandler(event) {
        switch (event.keyCode) {
            case 38:
                console.log('up')
                break;
        case 40:
            console.log('down')
            break;
        case 13:
            console.log('enter');
            break;
        case 27:
            console.log('esc');
            break;
        default:
            return;
        }
        event.preventDefault();
    }
    
    render() {
/*
let { value, children, isFocused,  searchCity, equalNames, error, setError, 
            focusHandler, blurHandler, onChange, fetchStatus, changeFetchStatus, loaded, loadHandler, loaderOn, loaderOff, loaderVisible } = this.props;
*/

        
        let { children, value, onChange, url, onFocus, onBlur, isFocused, loadCities, cities,
        loaderOn, loaderOff, loaderVisible, loaded, result, setError, error } = this.props;
        
        let className = `input-hint__hint ${isFocused ? 'input-hint__hint--focused': ''} ${value ? 'input-hint__hint--hidden' : ''}`;

        
        return (
    		<div className="input-hint">
    		    <label className={className} htmlFor="input">
    		        {children}
    		    </label>
    		    <input
    		        value={value}
    		        onChange={this.changeHandler.bind(this)}
    		        onKeyDown={this.keyBoardHandler.bind(this)}
    		        className="input-hint__input"
    		        id="input"
    		    />
                <Tooltip
                    url="static/kladr.json"
                    value={value}
                    cities={cities}
                    loadCities={loadCities}
                    loaded = {loaded}
                    onChange={onChange}
                    
                    result={result}
                    
                    loaderOn = {loaderOn}
                    loaderOff = {loaderOff}
                    loaderVisible ={loaderVisible}
                    isFocused= {isFocused}
                    
                    setError={setError}
                    error={error}
                    
                    selected={this.selected}
                />
            </div>
    	);
    }
}

function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};