import React, { useState }from 'react';
import { Accordion } from './Accordion';
import {languages,frameworks,details,images,issueLink} from './Constant';
import Empty from '../global/empty';
import { ListFrameworks,ListLangs } from "./OnboardUtils";

export default function Onboard(){
    const [language, setLang] = useState("None");
    const [options, setOptions] = useState([]);

    if(language === "None"){
        return(
        <div>
            <div>
                <h1>QuickStart</h1>
                <br/>
                <h3>Follow a QuickStart in language of your choice </h3>
                <br/>
                <ListLangs method = {setLang} languages = {languages}/>
            </div>
            <br/>
            <br/>
            <Empty doc={"https://docs.keploy.io/"} message={"Please add some apps by integrating SDK and running application in Capture mode! "} image={"None"} />
        </div>
        )
    }
    if(options.length === 0){
        const framework = frameworks[language];
        return(
            <div className="framework">
                <br/>
                <div className='flex-onboard-1'>
                    <h1>Select frameworks for {language}</h1>
                    <img className='heading' src={images[language]} alt={language}/>
                </div>
                <ListFrameworks method = {setOptions} frameworks = {framework} setLang = {setLang}/>
                <div className="link-github">
                <a href={issueLink[language]}>
                    Create Issue for New Dependency on Github !
                </a>
                </div>
                <br/>
                <br/>
            </div>
        )
    }
    let panels : any[] = [];
    options.forEach((i) => {
        panels.push({label:i,content:details[language][i]})
    })
    
    return(
        <div>
            <br/>
            <Accordion panels={ panels }/>
            <br/>
            <form onSubmit={formSubmitEvent => {formSubmitEvent.preventDefault();setOptions([]);}}>
              <button className="btn-onboard btn-primary-onboard btn-round-1-onboard" type="submit">Previous</button>
            </form>
        </div>
    )
}