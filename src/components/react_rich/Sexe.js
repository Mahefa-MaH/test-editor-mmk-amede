import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Stack, Slider, TextField, MenuItem,  InputAdornment, Typography  } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Sexe({ handleGenreChange }) {
  const [genre, setGenre] = useState(''); // État local pour suivre la valeur sélectionnée du genre

  const handleChange = (event) => {
    setGenre(event.target.value);
    handleGenreChange(event.target.value); // Appeler la fonction parent avec la nouvelle valeur du genre
  };

  return (
    <FormControl style={{marginLeft: 2}}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={2}>
        <FormControl  style={{marginTop: 10}} >Genre : </FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={genre}
          onChange={handleChange}
        >
          <FormControlLabel value="F" control={<Radio />} label="Femme" />
          <FormControlLabel value="H" control={<Radio />} label="Homme" />
          <FormControlLabel value="tous" control={<Radio />} label="Tous" />
        </RadioGroup>
      </Stack>
      </Stack>
    </FormControl>
  );
}
