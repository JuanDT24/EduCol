import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioGroup(props) {
    const {labels, handleChange} = props;
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {labels.map((label, index) => (
          <FormControlLabel 
            key={index} 
            value={label} 
            control={<Radio color="orangered" />} 
            label={label}
            onChange={(e) => handleChange(e.target.value)} 
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
