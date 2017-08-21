import React, { Component } from "react";

import "./Root.scss";

import Autocomplete from "../components/Autocomplete";

export default class Root extends Component {
    render() {
        return (
            <div className="flex-items">
                <div>
                    <h4>Автокомплит со стрелкой</h4>
                    <span className="city">Город</span>
                    <Autocomplete
                        arrow={true}
                        url="/searchcity"
                        queryValue="City"
                        width={310}
                        placeholder="Введите или выберите из списка"
                    />
                </div>
                <div>
                    <h4>Автокомплит без стрелки</h4>
                    <span className="city">Город</span>
                    <Autocomplete
                        arrow={false}
                        url="/searchcity"
                        queryValue="City"
                        width={310}
                        placeholder="Начните вводить код или название"
                    />
                </div>
            </div>
        );
    }
}