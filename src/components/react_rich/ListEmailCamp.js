import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const namemail = [
  'tahiry',
  'Henry',
];

function getStyles(name, emailcamp, themes) {
    return {
      fontWeight:
      emailcamp.indexOf(name) === -1
          ? themes.typography.fontWeightRegular
          : themes.typography.fontWeightMedium,
    };
  }
  

  export default function ListeEmailCamp({ handleEmailChange }) {
    const themes = useTheme();
    const [emailcamp, setEmailCamp] = React.useState([]);
    const handleChange = (event) => {
        const { value } = event.target;

        setEmailCamp(value); // Mettre à jour le state person avec les valeurs sélectionnées
        handleEmailChange(value); // Propager les changements au parent si nécessaire
    };
    
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 150, mt: 1 }}>
          <Select
            multiple
            displayEmpty
            value={emailcamp}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>List Email</em>;
              }
              return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <em>List Email</em>
            </MenuItem>
            {namemail.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, emailcamp, themes)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
  