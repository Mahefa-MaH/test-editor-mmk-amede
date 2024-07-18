import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Constantes pour la hauteur des éléments du menu
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let names = [
  '0324015784',
  '0335210478',
];

// Fonction pour déterminer le style d'un nom dans la liste en fonction de sa sélection
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
 // Composant ListeContact
export default function ListeContact({ result, handleNameChange }) {
  if (result) {
    console.log(result);
    const userEmails = result.response.map(user => user.user_email);
    names = userEmails;
  }
  
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);// État pour la liste des contacts
  const [newContact, setNewContact] = React.useState('');// État pour le nouveau contact
  const [isEmailValid, setIsEmailValid] = React.useState(true);// État pour la validité de l'email
  const [validatedContacts, setValidatedContacts] = React.useState([]);// État pour les contacts validés
  const [filteredContacts, setFilteredContacts] = React.useState([]); // État pour les contacts filtrés

   // Gestionnaire de changement pour le champ du nouveau contact
  const handleNewContactChange = (event) => {
  const { value } = event.target;
    setIsEmailValid(validateEmail(value));
    setNewContact(value);
  };

   // Effet pour mettre à jour la liste des contacts lorsque le résultat change
  React.useEffect(() => {
    if (result) {
    const userEmails = result.response.map((user) => user.user_email);
      setPersonName(userEmails);
    }
  }, [result]);
 
   // Gestionnaire pour ajouter un contact
  const handleAddContact = () => {
    if (newContact.trim() !== '' && isEmailValid) {
      const updatedNames = [newContact.trim(), ...personName]; // Ajouter le nouveau contact en tête de la liste
      setPersonName(updatedNames);
      setNewContact(''); // Effacer le contenu du champ newContact
    }
  };

  // Gestionnaire pour valider les contacts
  const handleValidate = async () => {
    if (filteredContacts.length > 0) {
      // Mettre à jour les contacts validés avec les contacts filtrés
      const updatedValidatedContacts = [...validatedContacts, ...filteredContacts];
      setValidatedContacts(updatedValidatedContacts);
      
      // Réinitialiser les contacts filtrés
      setFilteredContacts([]);
    }
    if (newContact.trim() !== '' && isEmailValid) {
      const updatedNames = [...personName, newContact.trim()];
      setPersonName(updatedNames);
    }
  
    // Convertit les données des contacts en une chaîne JSON pour être envoyée au serveur
  const jsonContent = JSON.stringify({
      list_contacts: personName, // list_contacts contient la liste des contacts actuels
      newContact: newContact,// newContact contient le nouveau contact saisi par l'utilisateur
      isEmailValid: isEmailValid,// isEmailValid indique si l'email du nouveau contact est valide
    });
    console.log("jsondata before sending:", jsonContent);
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/auto_mailing/cible-marketing-validate',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonContent,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const resp = await response.json();// Attend que la réponse de la requête soit convertie en JSON
      const data = JSON.parse(resp.data);// Parse les données JSON de la réponse pour les manipuler
      // response = data.map(entry => entry.email)
      
      console.log(data.map(entry => entry.email));// Affiche dans la console les emails des contacts validés
      // Affiche dans la console le contenu JSON après l'envoi de la requête
      console.log(
        "jsondata after sending:",
        JSON.stringify({ ...JSON.parse(jsonContent), resp })
      );
        // Mettre à jour les contacts validés
        setValidatedContacts([...validatedContacts, newContact.trim()]);
        // Ajouter le nouvel e-mail validé à la liste personName
        setPersonName([...data.map(entry => entry.email), newContact.trim()]);//eto manova azyyyy
       handleNameChange(data.map(entry => entry.email)); //mampipoitra anazy any @datajson rehefa m' clic bouton

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  // Fonction pour valider un email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
  setPersonName(typeof value === 'string' ? value.split(',') : value);
  handleNameChange(value);// Propage les changements au parent
  };
  return (
      <div style={{ marginLeft: 0 }}>
        <FormControl sx={{ m: 1, width: 200, mt: 1 }} >
          <Select
            multiple
            displayEmpty
            value={personName}
            onChange={handleChange} 
            input={<OutlinedInput sx={{ height: 40 }} />} //* Réduire la hauteur du champ de texte 
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Lst Contact</em>;
              }
              return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <em>Lst Contact</em>
            </MenuItem>
            {personName.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      <TextField
        label="nouveau contact"
        variant="outlined"
        value={newContact}
        onChange={handleNewContactChange}
        style={{ marginTop: 10 }}
        size="small" // Ajoutez cette ligne pour réduire la taille du champ
      />
      <Button
        variant="contained"
        onClick={handleAddContact}
        style={{ marginLeft: 10, marginTop: 10 }}
      >
        Ajouter
      </Button>
      <Button
        variant="contained"
        onClick={handleValidate}
        style={{ marginLeft: 10, marginTop: 10 }}
      >
        Valider
      </Button>
      {validatedContacts.length > 0 && (
   <FormControl sx={{ m: 1, width: 200, mt: 1 }}>
   <Select
     multiple
     displayEmpty
     value={personName}
     onChange={handleChange}
     input={<OutlinedInput sx={{ height: 40 }} />} //* Réduire la hauteur du champ de texte 
     renderValue={(selected) => {
       if (selected.length === 0) {
         return <em>Lst Contact</em>;
       }
       return selected.join(', ');
     }}
     MenuProps={MenuProps}
     inputProps={{ 'aria-label': 'Without label' }}
   >
     <MenuItem disabled value="">
       <em>Lst Contactes</em>
     </MenuItem>
     {personName.map((name) => (
       <MenuItem
         key={name}
         value={name}
         style={getStyles(name, personName, theme)}
         size="small" // Ajoutez cette ligne pour réduire la taille du champ
       >
         {name}
       </MenuItem>
     ))}
   </Select>
 </FormControl>
)}

    </div>
  );
}
