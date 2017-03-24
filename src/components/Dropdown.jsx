import React, { Component } from 'react';

export default class Dropdown extends Component {
    render() {
        let { data } = this.props;
        
        let list = data.map(i => <li key={i.toString()}>{i}</li>);
        
        return (
            <ul className="dropdown">
                {list}
            </ul>
        );
    }
}

