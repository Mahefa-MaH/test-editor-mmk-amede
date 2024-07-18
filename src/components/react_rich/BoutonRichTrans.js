import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function BoutonRichTrans({ email, sender, handleClickSend, dataJson,  }) {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete Trans
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickSend}>
                Send Trans
            </Button>
            {dataJson && <div>Data JSON: {dataJson}</div>}
        </Stack>
    );
}


