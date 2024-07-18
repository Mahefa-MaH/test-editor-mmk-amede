import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function Filtre({ handleDelete, handleSend }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column',  height: '6vh' }}>
    <Stack direction="column" spacing={2} sx={{
    direction: 'column',
    textAlign: 'center',
    alignContent: 'center'}}>
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend} style={{marginLeft: 10 ,width:'390px'}}>
        filtre
      </Button>
    </Stack>
    </div>
  );
}
