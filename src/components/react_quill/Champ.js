import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Champs({ setEmail, setSenderEmail }) {
  const [senderEmailValue, setSenderEmailValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    setEmail(event.target.value); // Met à jour l'état email dans EditorTextRich
  };

  const handleSenderEmailChange = (event) => {
    setSenderEmailValue(event.target.value);
    setSenderEmail(event.target.value); // Met à jour l'état sender_email dans EditorTextRich
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField
        id="demo-helper-text-aligned"
        label="Sender"
        value={senderEmailValue}
        onChange={handleSenderEmailChange}
      />
      <TextField
        helperText=" "
        id="demo-helper-text-aligned-no-helper"
        label="Email"
        value={emailValue}
        onChange={handleEmailChange}
      />
    </Box>
  );
}
