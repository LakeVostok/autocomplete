/*global location*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Tooltip extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        console.log('mounted')
        let { loadCities, setError } = this.props;
        let result;
        
        let request = new XMLHttpRequest();
        request.open('GET', this.props.url, true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState != 4) return;
        
            if (request.status != 200) {
                console.warn( request.status + ': ' + request.statusText );
                setError(true);
            } else {
                try {
                    result = JSON.parse(request.responseText);
                } catch (e) {
                    console.warn( "Некорректный ответ " + e.message );
                    setError(true);
                }
                loadCities(result);
            }
        };
    }
    
    test(i) {
        let { selected } = this.props;
        //
        if(Object.keys(i).length == 0) return;
        console.log("ыы",i);
        let node = ReactDOM.findDOMNode(this.refs[selected]);
        node.classList.toggle('test');
    }
    
    render() {
        let { value, cities, loaderOn, loaderOff, loaderVisible, loaded, isFocused, error, selected } = this.props;
        let className = `tooltip ${isFocused ? 'tooltip__visible' : ''}`;

        let rawList = cities.filter( q => q.City.toLowerCase().indexOf(value.toLowerCase()) == 0 );
        let map = rawList.map(function(e, i) {
          return { index: i, value: e.City.toLowerCase() };
        });
        map.sort(function(a, b) {
            if(a.value.indexOf('.') != -1) return 1;
            return +(a.value > b.value) || +(a.value === b.value) - 1;
        });
        let result = map.map(function(e) {
          return rawList[e.index];
        });
                
        let listItems;
        let output=[];
        
        if(error){
            listItems = <li className="tooltip-item tooltip-item__error">
                            <div className="tooltip-item__error-message">
                                Что-то пошло не так. Проверьте соединение с интернетом и попробуйте ещё раз
                            </div>
                            <div onClick={() => location.reload()}className="tooltip-item__error-refresh">
                                Обновить
                            </div>
                        </li>;
        } else if(!loaded && value && isFocused && loaderVisible) {
            listItems = <li className="tooltip-item tooltip__loading">Загрузка</li>;
        } 
        else if(!result.length && value && loaded) {
            listItems = <li className="tooltip-item">Не найдено</li>;
        } 
        else if(result.length && value) {
            
            for (let i = 0; i < result.length; i++) {
                if (i == 5) break;
                output.push(result.shift());    
            }
/*
            listItems = output.map((item, i) =>
                (<li className="tooltip-item" ref={i} key={item.Id.toString()}>{item.City}</li>)
            );
*/
            listItems = output.map((item, i) =>
                (<ListItem onClick={e => console.log(this)} className="tooltip-item" ref={i} key={item.Id.toString()}>{item.City}</ListItem>)
            );
            
            if(output.length > 4){
                listItems.push(<li key="showMore" className="tooltip-item__show-more">Показано {output.length} из {result.length+listItems.length} городов. Уточните запрос, чтобы увидеть остальные</li>)
            }
        }
        
        //if(this.refs) this.test(this.refs);
        //if(this.refs && listItems) console.log(listItems[1].ref)
        
        return (
            <ul className={className} >
                {listItems}
            </ul>

        );
    }
}

class ListItem extends Component {
    render() {
        let { children } = this.props;
        return (
            <li { ...this.props }>{children}</li>    
        );
    }
}