import React from 'react';
import profileInputStyle from './ProfileCustomizedInput.module.css'

const ProfileCustomizedInput = (props) => {
  return (
    <div>
    {props.type === 'file' ? <input type={props.type} className={profileInputStyle.input} disabled={props.disability} value={props.value} 
    onChange={e => props.onChangeValue(e.target.files[0], props.name)} id={props.id} placeholder={props.placeholder} /> 
    : 
    <input type={props.type} className={profileInputStyle.input} disabled={props.disability} value={props.value} 
        onChange={e => props.onChangeValue(e.target.value, props.name)} id={props.id} placeholder={props.placeholder} />
}
      
    </div>
  );
}

export default ProfileCustomizedInput;
