import React,{ useState } from "react";
import '../../../static/onboardingCss/Checkbox.css'

export interface CheckboxProps {
    label : string
    handleCheckboxChange : Function
    key : string
}

export interface ListCheckboxesProps{
    arr : Array<string>
    setOptions : Function
    setLang : Function
}

export function Checkbox(props:CheckboxProps){
    const [isChecked,setCheck] = useState(false);
    const toggleCheckboxChange = () => {
        const { handleCheckboxChange, label } = props;
        setCheck(!isChecked);
        handleCheckboxChange(label);
      }
    return(
            <div className="largeFont">
                
                    <input value={props.label}
                            checked={isChecked}
                            onChange={toggleCheckboxChange}
                            type="checkbox" className="chb-onboard chb-3-onboard" id={props.label} />
                    <label className="listFrameworks" htmlFor={props.label}>{props.label}</label>
            </div>
    )
}

export function ListCheckboxes(props: ListCheckboxesProps){
    const selectedCheckboxes = new Set()
    const items = props.arr
    const setOptions = props.setOptions
    const toggleCheckbox = (label: unknown) => {
        if (selectedCheckboxes.has(label)) {
            selectedCheckboxes.delete(label);
        } else {
            selectedCheckboxes.add(label);
        }
    }

    const handleFormSubmit = (formSubmitEvent: { preventDefault: () => void; }) => {
        formSubmitEvent.preventDefault();
        if(selectedCheckboxes.size !== 0){
            let arr = Array.from(selectedCheckboxes);
            setOptions(arr);
        }
    }

    const createCheckbox = (label: string) => (
            <Checkbox
                    label={label}
                    handleCheckboxChange={toggleCheckbox}
                    key={label}
                />
          )
    const createCheckboxes = () => (
        items.map(createCheckbox)
    )

    return (
        <div className="listCheckbox">
            <form onSubmit={handleFormSubmit}>
                {createCheckboxes()}
                <br/>
                <div className="flex-2-onboard">
                    <form onSubmit={formSubmitEvent => {formSubmitEvent.preventDefault(); props.setLang("None");}}>
                        <button className="btn-onboard btn-primary-onboard btn-round-1-onboard largeFont" type="submit">Previous</button>
                    </form>
                    <button className="btn-onboard btn-primary-onboard btn-round-1-onboard largeFont" type="submit">Next</button>
                </div>
            </form>
        </div>
    );
}

export default ListCheckboxes;