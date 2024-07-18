import React, { useState } from 'react';
import { Stack, Slider, TextField, MenuItem  } from '@mui/material';

export default function NombreCommande({ handleMinCommandeChange, handleMaxCommandeChange }) {
  const mincomPrice = 1;
  const maxcomPrice = 100;
  const [priceRangeCommValue, setPriceRangeCommValue] = useState([mincomPrice, maxcomPrice]);
  const [commandes, setCommandes] = useState(Array.from({ length: 100 }, (_, i) => i + 1)); // Liste des commandes de 1 à 100

  const handlePriceRangeCommChange = (event, newValue) => {
    setPriceRangeCommValue(newValue);
    handleMinCommandeChange(newValue[0]);
    handleMaxCommandeChange(newValue[1]);
  };

  return (
    <div>
      <Slider
        value={priceRangeCommValue}
        onChange={handlePriceRangeCommChange}
        valueLabelDisplay="auto"
        mincom={mincomPrice}
        maxcom={maxcomPrice}
        sx={{ width: '390px',  marginLeft: 2 }}
      />

      <Stack direction="row" spacing={2} sx={{
    direction: 'column',
    textAlign: 'center',
    alignContent: 'center'}}>
        <TextField
          select
          label="commande minimum"
          value={priceRangeCommValue[0]}
          onChange={(e) => {
            setPriceRangeCommValue([Number(e.target.value), priceRangeCommValue[1]]);
          }}
          variant="outlined"
          sx={{ width: '200px' }}
        >
          {commandes.map((commande) => (
            <MenuItem key={commande} value={commande}>
              {commande}
            </MenuItem>
          ))}
        </TextField>
        <TextField 
          select
          label="commande maximum"
          value={priceRangeCommValue[1]}
          onChange={(e) => {
            setPriceRangeCommValue([priceRangeCommValue[0], Number(e.target.value)]);
          }}
          variant="outlined"
          sx={{ width: '200px' }}
        >
          {commandes.map((commande) => (
            <MenuItem key={commande} value={commande} >
              {commande}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </div>
  );
}
