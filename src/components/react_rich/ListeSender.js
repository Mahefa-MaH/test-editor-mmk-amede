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

const namesender = [
  '1',
  '2',
];

function getStyles(name, emailSender, themes) {
    return {
      fontWeight:
      emailSender.indexOf(name) === -1
          ? themes.typography.fontWeightRegular
          : themes.typography.fontWeightMedium,
    };
  }
  

  export default function ListeSender({ handleSenderlChange }) {
    const themes = useTheme();
    const [emailSender, setEmailSender] = React.useState([]);
    const handleChange = (event) => {
        const { value } = event.target;

        setEmailSender(value); // Mettre à jour le state person avec les valeurs sélectionnées
        handleSenderlChange(value); // Propager les changements au parent si nécessaire
    };
    
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 150, mt: 1 }}>
          <Select
            multiple
            displayEmpty
            value={emailSender}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>List Sender</em>;
              }
              return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <em>List Sender</em>
            </MenuItem>
            {namesender.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, emailSender, themes)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
  