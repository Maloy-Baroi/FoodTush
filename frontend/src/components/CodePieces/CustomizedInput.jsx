import React from 'react'
import inputStyle from './CustomizedInput.module.css'

const CustomizedInput = (props) => {
    return (
        <div>
            {props.label ? <label htmlFor="customizedInput" className={"form-label " + inputStyle.label}>
                {props.label}
            </label>
                : ""}
            <input type={props.type} onChange={(e) => props.onMyChange(e.target.value)} value={props.value} style={{width: props.width}}
                className={"form-control " + inputStyle.input} aria-describedby="customizedInput"
                placeholder={props.placeholder} />
            {props.hintMessage ?
                <small id="customizedInput" className={"form-text text-muted " + inputStyle.small}>
                    {props.value ? <span>We will send mail to:- {props.value}</span> : props.hintMessage}
                </small>
                : ""}
        </div>
    )
}

export default CustomizedInput
