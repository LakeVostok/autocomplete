import React, { Component } from "react";
import PropTypes from "prop-types";

import Portal from "../Portal";
import Collector from "../Collector";

import throttle from "../../lib/throttle";

import "./Popup.scss";

export default class Popup extends Component {
    constructor() {
        super();

        this.state = {
            location: {}
        };
        
        this.throttledUpdate = throttle(() => this.forceUpdate(), 100);
    }
 
    componentDidMount() {
        window.addEventListener("resize", ::this.throttledUpdate);
        window.addEventListener("scroll", ::this.throttledUpdate);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", ::this.throttledUpdate);
        window.removeEventListener("scroll", ::this.throttledUpdate);
    }
    
    componentDidUpdate() {
        if(this.popup) {
            let { anchor, positions, margin, offset } = this.props;
            
            let location = getOptimalPopupCoordinates(anchor, this.popup, positions, margin, offset);

            if(!areLocationsEqual(location, this.state.location)) {
                this.setState({ location });
            }
        }
    }
    
    render() {
        if(!this.props.opened) return null;
        
        let { top, left } = this.state.location;
        
        return (
            <Portal>
                <Collector onClickOutside={this.props.onClickOutside} onFocusOutside={this.props.onFocusOutside}>
                    <div
                        ref={node => this.popup = node}
                        className="popup__container"
                        style={{top: top+"px", left: left+"px"}}
                    >
                        {this.props.children}
                    </div>
                </Collector>
            </Portal>
        );
    }
}

function getOptimalPopupCoordinates(anchor, popup, positions, margin, offset) {
    let anchorRect = getElementRect(anchor);
    let popupRect = getElementRect(popup);
    let coordinates;
    
    for(let i = 0; i < positions.length; i++) {
        let { side, align } = getPosition(positions[i]);
        
        coordinates  = getPopupCoordinates(anchorRect, popupRect, side, align, margin, offset);
        let rect = { width: popupRect.width, height: popupRect.height, ...coordinates };
        
        if (isRectInViewPort(rect)) return coordinates;
    }
    return coordinates;
}

function getPopupCoordinates(anchorRect, popupRect, side, align, margin, offset) {
    switch(side) {
        case "top":
            return {
                top: anchorRect.top - popupRect.height - margin,
                left: getAlignCoordinates(anchorRect, popupRect, align, offset)
            };
        case "bottom":
            return {
                top: anchorRect.top + anchorRect.height + margin,
                left: getAlignCoordinates(anchorRect, popupRect, align, offset)
            };
        case "right":
            return {
                top: getAlignCoordinates(anchorRect, popupRect, align, offset),
                left: anchorRect.left - popupRect.width - margin
            };
        case "left":
            return {
                top: getAlignCoordinates(anchorRect, popupRect, align, offset),
                left: anchorRect.left - popupRect.width - margin
            };
        default: throw new Error(`Invalid popup side "${side}"`);
    }
}

function getAlignCoordinates(anchorRect, popupRect, align, offset) {
    switch(align) {
        case "left":   return anchorRect.left - offset;
        case "center": return anchorRect.left + (anchorRect.width - popupRect.width) / 2;
        case "right":  return anchorRect.left + anchorRect.width - popupRect.width + offset;
        case "top":    return anchorRect.top - offset;
        case "middle": return anchorRect.top + (anchorRect.height - popupRect.height) / 2;
        case "bottom": return anchorRect.top + anchorRect.height - popupRect.height + offset;
        default: throw new Error("Invalid popup align");
    }
}

function getElementRect(element) {
    let rect = element.getBoundingClientRect();
    let view = document.documentElement;
    
    let top = rect.top + window.pageYOffset - view.clientTop;
    let left = rect.left + window.pageXOffset - view.clientLeft;
    
    return { top, left, width: rect.width, height: rect.height };
}

function areLocationsEqual(newLocation, oldLocation) {
    if(!newLocation || ! oldLocation) return false;
    if(newLocation == oldLocation) return true;
    return newLocation.top == oldLocation.top && newLocation.left == oldLocation.left;
}

function getPosition(position) {
    let [side, align] = position.split(" ");
    return {side, align};
}

function isRectInViewPort(rect) {
  let { top, left, width, height } = rect;
  let { pageYOffset, pageXOffset, innerHeight, innerWidth } = window;
  return top - pageYOffset >= 0 && left - pageXOffset >= 0 && top + height <= innerHeight && left + width <= innerWidth;
}


Popup.propTypes = {
    /**
     * Element for which popup will be render 
     */
    anchor: (props, propName, componentName) => {
        let isHTMLElement = props[propName] instanceof Element;
        if(props.opened && !isHTMLElement) throw new Error(`Component ${componentName} expects a DOM element at prop "${propName}", but got ${props[propName]}`);
    },

    /**
     * Positions where popup will be rendered
     */
    positions: PropTypes.arrayOf(PropTypes.string).isRequired,
    
    /**
     * State of visibility 
     */
    opened: PropTypes.bool.isRequired,
    
    /**
     * Identation between popup and anchor 
     */
    margin: PropTypes.number.isRequired,
    
    /**
     * Popup"s offset relative to the anchor 
     */
    offset: PropTypes.number.isRequired,
    
    /**
     * Callback that is passed to the Collector and is called when happens click outside of the component
     */
    onClickOutside: PropTypes.func.isRequired,
    
    /**
     * Callback that is passed to the Collector and is called when happens focus outside of the component
     */
    onFocusOutside: PropTypes.func.isRequired,
    
    /**
     * Content of popup 
     */
    children: PropTypes.node
};
