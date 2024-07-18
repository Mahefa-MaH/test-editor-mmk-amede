import React, { useState } from 'react';
import { Stack, Slider, TextField, MenuItem  } from '@mui/material';

export default function PriceFilter({ handleMinChange, handleMaxChange }) {
  const minPrice = 1;
  const maxPrice = 100;
  const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice]);
  const [ages, setAges] = useState(Array.from({ length: 100 }, (_, i) => i + 1)); // Liste des âges de 1 à 100

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue);
    handleMinChange(newValue[0]);
    handleMaxChange(newValue[1]);
  };

  return (
   <Stack sx={{
    direction: 'column',
    textAlign: 'center',
    alignContent: 'center'}}>
      <Slider
        value={priceRangeValue}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={minPrice}
        max={maxPrice}
        sx={{ width: '390px', marginLeft: 2 }}
      />

      <Stack direction="row" spacing={2}>
        <TextField
          select
          label="Age minimal"
          value={priceRangeValue[0]}
          onChange={(e) => {
            setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
          }}
          variant="outlined"
          sx={{ width: '200px' }}
        >
          {ages.map((age) => (
            <MenuItem key={age} value={age}>
              {age}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Age maximal"
          value={priceRangeValue[1]}
          onChange={(e) => {
            setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
          }}
          variant="outlined"
          sx={{ width: '200px' }}
        >
          {ages.map((age) => (
            <MenuItem key={age} value={age}>
              {age}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      </Stack>
  );
}
