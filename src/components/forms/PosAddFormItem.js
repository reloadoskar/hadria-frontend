import React from 'react'
import { TextField } from '@material-ui/core';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function PossAddFormItem({label, value, handleChange, isAutoFocused }){
    return(
        <TextField
            id={label}
            type="number"
            variant="outlined"
            autoFocus={!isAutoFocused ? false : isAutoFocused}
            required
            fullWidth
            label={capitalize(label)}
            value={value}
            onChange={(e) => handleChange(label, e.target.value)}
        />
    )
}