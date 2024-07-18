import React, { useState } from 'react';
import { Stack, Slider, TextField, MenuItem,  InputAdornment  } from '@mui/material';

export default function PriceFilter({ handleMinMontChange, handleMaxMontChange }) {
  const minPrice = 100;
  const maxPrice = 10000000;
  const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue);
    handleMinMontChange(newValue[0]);
    handleMaxMontChange(newValue[1]);
  };

  return (
    <div >
      <Slider
        value={priceRangeValue}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={minPrice}
        max={maxPrice}
        sx={{ width: '390px', marginLeft: 2 }}
      />

      <Stack direction="row" spacing={2} sx={{
        direction: 'column',
        textAlign: 'center',
        alignContent: 'center'}}>
        <TextField
          label="montant minimum"
          value={`${priceRangeValue[0].toLocaleString()} `}
          onChange={(e) => {
          const value = e.target.value === '' ? minPrice : Number(e.target.value.replace(/[^\d]/g, ''));
          setPriceRangeValue([value, priceRangeValue[1]]);
          handleMinMontChange(value);
          }}
          variant="outlined"
          InputProps={{
          endAdornment: <InputAdornment position="end">AR</InputAdornment>,
          }}
          sx={{ width: '200px' }}
        />

        <TextField
          label="montant maximum"
          value={`${priceRangeValue[1].toLocaleString()} `}
          onChange={(e) => {
          const value = e.target.value === '' ? maxPrice : Number(e.target.value.replace(/[^\d]/g, ''));
          setPriceRangeValue([priceRangeValue[0], value]);
          handleMaxMontChange(value);
          }}
          variant="outlined"
          InputProps={{
          endAdornment: <InputAdornment position="end">AR</InputAdornment>,
          }}
          sx={{ width: '200px' }}
        />
      </Stack>
    </div>
  );
}
