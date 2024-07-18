import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

export default function BoutonRichCamp({ handleClickSendCamp,handleClickDeleteCamp }) {
    return (
        <Stack direction="row" spacing={2} style={{ marginTop: 10}}>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickSendCamp} fullWidth>
                Envoyer
            </Button>
        </Stack>
    );
}

