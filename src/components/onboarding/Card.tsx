import React from "react"
import '../../../static/onboardingCss/Card.css';

export interface CardProps {
    img : string
    title : string
    method : any
}

function CreateCard(props : CardProps){
    return (
      React.createElement("div", { className: "card-onboard" },
      React.createElement("img", { src: props.img }), 
      React.createElement("div", { className: "card-body-onboard" }, 
      React.createElement("h2", null, props.title), 
    )));
}

function Card(props : CardProps){
    return (
      React.createElement(React.Fragment, null,
      React.createElement("div", { className: "cards-onboard" ,
       onClick: () => {
            props.method(props.title)}
    }, 
      React.createElement(CreateCard, props))));
}

export default Card;