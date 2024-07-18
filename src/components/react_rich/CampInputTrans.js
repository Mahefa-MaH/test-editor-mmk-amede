import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function ChampInputTrans({ setSenderEmailTans, setListContactId }) {
  const [senderEmailTransValue, setSenderEmailTransValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    setSenderEmailTans(event.target.value);// Met à jour l'état sender_email dans EditorTextRich
  };

  const handleSenderEmailTransChange = (event) => {
    setSenderEmailTransValue(event.target.value);
    setListContactId(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="email"
    >
      <TextField
        id="outlined-controlled"
        label="Sender Email Trans"
        value={senderEmailTransValue}
        onChange={handleSenderEmailTransChange}
      />
      <TextField
        id="outlined-uncontrolled"
        label="Email"
        value={emailValue}
        onChange={handleEmailChange}
      />
    </Box>
  );
}

export default ChampInputTrans;
