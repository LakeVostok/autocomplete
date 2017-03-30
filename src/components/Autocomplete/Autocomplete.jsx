import React, { Component } from 'react';
import './Autocomplete.scss';

import Input from '../Input';
import Dropdown from '../Dropdown';
import DataList from '../DataList';

export default class Autocomplete extends Component {
    render() {
        
        let { id, inputValue, onFocus, onBlur, type } = this.props; 
        //let self = this.props[id];
        
        let className = `autocomplete ${type == 'autocomplete--select' ? type : 'autocomplete--input'}`;
        return (
            <div className={className}>
                <Input
                    placeholder="azaza"
                    onChange = { (e) => inputValue(id, e) }
                    onFocus =  { (e) => onFocus(id, e) }
                    onBlur =   { (e) => onBlur(id, e) }
                    />
                    <button onClick={()=>this.props.loadData(id, 'static/kladr.json')}>load</button>
                    <Dropdown>
                        <li>azaza</li>
                    </Dropdown>
            </div>    
        ); 
    }
}

