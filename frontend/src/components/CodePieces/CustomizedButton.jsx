import React from 'react'

const CustomizedButton = (props) => {
    return (
        <div>
            <button type={props.btnType} name="send-main" id="send-main" className="btn" role="button"
                style={{ width: "328px", height: "48px", backgroundColor: props.bgColor, color: props.textColor }}>
                {props.icon ? <i className={props.icon} style={{ color: props.iconColor }}></i> : ""} &nbsp;
                {props.innerText}
            </button>
        </div>
    )
}

export default CustomizedButton
