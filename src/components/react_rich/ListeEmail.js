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

const names = [
  'Oliver@gmail.com',
  'VanHenry@yao.com',
  'AprilTucker@gail.com',
];

function getStyles(name, emailName, theme) {
  return {
    fontWeight:
    emailName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
        backgroundColor: emailName.indexOf(name) !== -1 ? '#ffffff' : 'transparent', // Change la couleur de fond si l'e-mail est sélectionné
  };
}

export default function ListeEmail({ handleemailNameChange }) {
  const theme = useTheme();
  const [emailName, setEmailName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmailName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    handleemailNameChange(value); // Propage les changements au parent
  };

  return (
    <div style={{ marginLeft: 1100 }}> {/* Utilisation d'une valeur numérique pour la marge (1200 pixels) */}
      <FormControl sx={{ m: 1, width: 150, mt: 1 }}>
        <Select
          multiple
          displayEmpty
          value={emailName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Liste Email</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Liste Email</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, emailName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}