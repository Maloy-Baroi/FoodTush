import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import option from './Option.module.css';

const ProfileOtherOptions = (props) => {
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className={option._css_kUXEDL} onClick={() => props.onChangeActivePage('running_orders')}>
            <div className={option._css_jvDoyb}>
              Running Orders
            </div>
          </div>
          <div className={option._css_kUXEDL} onClick={() => props.onChangeActivePage('previous_orders')}>
            <div className={option._css_jvDoyb}>
              Previous Orders
            </div>
          </div>
          <div className={option._css_kUXEDL} onClick={() => props.onChangeActivePage('profile_settings')}>
            <div className={option._css_jvDoyb}>
              Profile Settings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOtherOptions;
