import React, { Component } from "react";

import Autocomplete from "../components/Autocomplete";

export default () => (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "310px"}}>
            <Autocomplete placeholder="Введите или выберите из списка" url="/searchcity" arrow={true} queryValue="City"/>
        </div>
        <div style={{ width: "310px"}}>
            <Autocomplete placeholder="Начните вводить код или название" url="/searchcity" arrow={false}  queryValue="City"/>
        </div>
    </div>
);