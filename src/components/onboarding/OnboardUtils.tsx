import React from "react"
import Card from "./Card"
import ListCheckboxes from "./Checkbox"

export interface ListLangsProps {
    languages : Array<Array<string>>
    method : any
}

export interface ListFrameworksProps {
    frameworks : String[]
    method : any
    setLang : any
}


export function ListFrameworks(props : ListFrameworksProps){
    let arr : any = []
    props.frameworks.forEach((i) => {
        arr.push(i);
    })
    return(
        <div>
            <ListCheckboxes arr = {arr} setOptions = {props.method} setLang = {props.setLang}/>
        </div>
    )
}


export function ListLangs(props: ListLangsProps){
    let cards : any[] = []
    let arr : any[] = []
    props.languages.forEach((i) => {
        arr.push(React.createElement(Card, {img: i[1],
        title: i[0],method:props.method}))

        if(arr.length === 2){
            cards.push(<div className="flex-1-onboard">{arr}</div>);
            arr = [];
        }
    })
    if(arr.length === 1){
        cards.push(<div className="flex-1-onboard">{arr}</div>);
        arr = [];
    }
    return(
        <div>{cards}</div>
    )
}