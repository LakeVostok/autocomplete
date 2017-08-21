import React, { Component } from "react";

export default class Loader extends Component {
    render() {
        return (
            <svg
                width="34px" 
                height="34px" 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                className="lds-rolling"
                style={{background: "none"}}
            >
                <circle
                    cx={50}
                    cy={50}
                    fill="none"
                    stroke="#a5a5a5"
                    strokeWidth={3}
                    r={17}
                    strokeDasharray="56.548667764616276 20.84955592153876"
                    transform="rotate(54 50 50)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        calcMode="linear"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                        dur="1s"
                        begin="0s"
                        repeatCount="indefinite"
                    ></animateTransform>
                </circle>
            </svg>
        );
    }
}