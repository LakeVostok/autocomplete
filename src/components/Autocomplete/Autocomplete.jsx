import React, { Component } from 'react';
import './Autocomplete.scss';

import Input from '../Input';
import Dropdown from '../Dropdown';
import DataList from '../DataList';

export default class Autocomplete extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.sortData = this.sortData.bind(this);
    }
    
    onChangeHandler(e) {
        let { inputValue, id } = this.props;
        inputValue(id, e);
    }
    
    onFocusHandler(e) {
        let { onFocus, id, type } = this.props;
        onFocus(id, e);
    }
    
    onBlurHandler(e) {
        let { onBlur, id } = this.props;
        onBlur(id, e);
    }
    
    sortData(data) {
        if(!data) return;
        
        let list = data.map((e, i) => ({ index: i, value: e.City.toLowerCase() }) );
        
        list.sort((a, b) => {
            if(a.value.indexOf('.') != -1) return 1;
            if(!isNaN(a.value[0])) return 1;
            return +(a.value > b.value) || +(a.value === b.value) - 1;   
        })
        
        let sortedList = list.map(e => data[e.index]);
        
        return sortedList;
    }
    
    render() {
        let { id, inputValue, onFocus, onBlur, type, data } = this.props; 
        let className = `autocomplete ${type == 'autocomplete--select' ? type : 'autocomplete--input'}`;
        
        if(type == 'autocomplete--input') {
            
        } else if(type == 'autocomplete--select') {
            
        }
        
        return (
            <div className={className}>
                <Input
                    placeholder="Введите значение"
                    onChange = { this.onChangeHandler }
                    onFocus =  { this.onFocusHandler }
                    onBlur =   { this.onBlurHandler }
                    />
                    <button onClick={()=>this.props.loadData(id, 'static/kladr.json')}>load</button>
                    
                    <Dropdown>
                        <DataList data={this.sortData(data)}/>
                    </Dropdown>
            </div>    
        ); 
    }
}

