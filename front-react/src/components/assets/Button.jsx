import React from 'react';
import { useState } from 'react';
import './Button.css'

export default function Button(props) {
    const { label, onClick, disabled: propDisabled } = props;
    const [internalDisabled, setInternalDisabled] = useState(true);
    
    const isDisabled = propDisabled !== undefined ? propDisabled : internalDisabled;

    const handleClick = () => {
        if (isDisabled) {
            setInternalDisabled(false); 
        } else {
            onClick?.(); 
        }
    };

    return (
        <button 
            className="gradient-button" 
            onClick={handleClick}
            disabled={isDisabled}
        >
            {label}
        </button>
    );
}