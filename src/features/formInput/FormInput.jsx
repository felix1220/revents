import React from "react";
import './FormInput.styles.css';

export function FormInput({label, ...otherProps}){
   return (
    <div className='group'>
          <input className='form-input' {...otherProps} />
        <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
       
   </div>
   ) 
}