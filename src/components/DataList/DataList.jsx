import React, { Component } from 'react';
import './DataList.scss';

export default class DataList extends Component {
    render() {
        let { data } = this.props;
        
        if(!this.props.data) {
            return <li>loading</li>;
        }
        
        let listItems = data.map((item, index) =>
          <li key={item.Id}>{item.City}</li>
        );
        
        return (
            <ul className="autocomplete--hint">{listItems}</ul>
        );
    }
}