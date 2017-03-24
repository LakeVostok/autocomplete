import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as autocompleteActions from '../actions/autocompleteActions';

import Input from '../containers/Input.jsx';
import Dropdown from './Dropdown.jsx';

import './Autocomplete.scss';


class Autocomplete extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        axios.get(this.props.url)
          .then(res => {
            const data = res.data;
          })
          .catch(e => this.setState({ error: e}));
    }

    render() {
        let { type, id } = this.props;
        let data = this.props.autocomplete[id];
        console.log(data.data)

        return (
            <div className={`autocomplite ${type}`}>
                <Input id={id} placeholder="Введите название или код" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);