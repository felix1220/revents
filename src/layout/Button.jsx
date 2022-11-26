import React from "react";
import './Button.styles.css'

const BUTTON_TYPE_CLASSES  = {
    google:'google-sign-in',
    inverted:'inverted'
}
export function Button({ children, buttonType, ...otherProps }) {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType] }`} {...otherProps}>
            { children }
        </button>
    )
}