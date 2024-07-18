import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

export default function Bouton({ handleClickSend,handleClickDelete, email, sender,dataJson }) {
    return (
        <Stack direction="row" spacing={2}>
             <Button variant="outlined" startIcon={<DeleteIcon />}  onClick={handleClickDelete}>
                Delete 
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickSend}>
                Send 
            </Button>
            {dataJson && <div>Data JSON: {dataJson}</div>}
        </Stack>
    );
}

