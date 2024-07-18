import React, { useState } from 'react';
import { Grid, Stack, Typography, Box, Button, TextField } from '@mui/material';

// Composant ChampInputCamp
function ChampInputCamp({ setSenderEmailCamp, setListContactId, setSenderNameCamp, setSubject, setId }) {
  // Déclaration des états pour les valeurs des champs
  const [senderEmailCampValue, setSenderEmailCampValue] = useState('');
  const [listContactIdValue, setListContactIdValue] = useState('');
  const [SenderNameCampValue, setSenderNameCampValue] = useState('');
  const [SubjectValue, setSubjectValue] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Expression régulière pour valider une adresse email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Fonction pour vérifier si tous les champs sont remplis
  const checkFormValidity = () => {
    if (senderEmailCampValue && listContactIdValue && SenderNameCampValue && SubjectValue ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  // Gestion du changement de chaque champ
  const handleSubject = (event) =>{
    setSubjectValue(event.target.value);
    setSubject(event.target.value);
    checkFormValidity();
  }

  const handleSenderNameCampChange = (event) =>{
    setSenderNameCampValue(event.target.value);
    setSenderNameCamp(event.target.value);
    checkFormValidity();
  }
  
  const handleSenderEmailCampChange = (event) => {
    const email = event.target.value;
    setSenderEmailCampValue(email);

    if (emailRegex.test(email)) {
      setSenderEmailCamp(email);
    } else {
      setSenderEmailCamp('');
    }
    checkFormValidity();
  };
  
  const handleListContactIdChange = (event) => {
    setListContactIdValue(event.target.value);
    setListContactId(event.target.value);
    checkFormValidity();
  };

  // Rendu du composant ChampInputCamp
  return (
    <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="outlined-uncontrolled"
          label="Objet"
          value={SubjectValue}
          onChange={handleSubject}
          size="small" // Reduces the size of the field
          fullWidth // Makes the field take up the full width of its grid item
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="outlined-uncontrolled"
          label="Nom de l'expéditeur"
          value={SenderNameCampValue}
          onChange={handleSenderNameCampChange}
          size="small" // Reduces the size of the field
          fullWidth // Makes the field take up the full width of its grid item
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="outlined-controlled"
          label="Email de l'expéditeur"
          value={senderEmailCampValue}
          onChange={handleSenderEmailCampChange}
          size="small" // Reduces the size of the field
          fullWidth // Makes the field take up the full width of its grid item
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="outlined-uncontrolled"
          label="Nom de la campagne"
          value={listContactIdValue}
          onChange={handleListContactIdChange}
          size="small" // Reduces the size of the field
          fullWidth // Makes the field take up the full width of its grid item
        />
      </Grid>
    </Grid>
  );
}

export default ChampInputCamp;
