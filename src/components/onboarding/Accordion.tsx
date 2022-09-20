import React, { useEffect, useState } from "react"
import CopyToClipboard from "./CopyToClipboard"
import '../../../static/onboardingCss/Accordion.css'

export interface PanelProps {
    index: number,
    activeTab: number,
    activateTab: Function
    label: string,
    content: string
}


function Panel(props: PanelProps){
    const [height, setHeight] = useState(0)
    const isActive = props.activeTab === props.index
    const innerStyle = {
        height:  `${isActive ? height : 0}px`
    }

    useEffect(()=>{
        window.setTimeout(() => {
			setHeight(620)
		}, 333);
    },[])

    return (
        <div className='panel'
            role='tabpanel'
            aria-expanded={ isActive }>
            <button className='panel__label'
                role='tab'
                onClick={()=>{props.activateTab(props.index)}}
                >
                { props.label }
            </button>
            <div className='panel__inner'
                style={ innerStyle }
                aria-hidden={ !isActive }>
                <div className="clipboard">
                    <CopyToClipboard data={props.content}/>
                </div>
                <p className='panel__content'>
                    <pre>
                        { props.content }
                    </pre>
                </p>
            </div>
        </div>
    );
}



export interface AccordionProps {
    panels: {label: string, content: string}[]
}

export function Accordion( props:AccordionProps ){
    const [activeTab, setActiveTab] = useState(0)
    const activateTab: Function = function(index: number) {
            setActiveTab( activeTab === index ? -1 : index)
            
    }
    return (
        <div className='accordion' role='tablist'>
            {props.panels.map((panel, index) =>
                <Panel
                    key={ index }
                    activeTab={ activeTab }
                    index={ index }
                    { ...panel } 
                    activateTab= {activateTab}
                />
            )}
        </div>
    );
}
