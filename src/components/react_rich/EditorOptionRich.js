{/*import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SenderDropdown from '../SenderDropdown';

const EditorOptionRich = ({ editorState, setEditorState }) => {

    const options = ['Option 1', 'Option 2'];
    const options_value = { 'Option 1': '1', 'Option 2': '2' };

    const [email, setEmail] = useState(''); // État pour stocker l'adresse email
    const [sender, setSender] = useState(''); // État pour stocker l'ID du sender

    const [listContactId, setListContactId] = useState(''); // État pour stocker liste contact id
    const [senderCompaignId, setSenderCompaignId] = useState(''); // État pour stocker l'ID du sender compaign

    const [selectedOption, setSelectedOption] = useState(options[0]); // État pour stocker l'option sélectionnée
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [messageSent, setMessageSent] = useState(false);
    const [warning, setWarning] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value); // Met à jour l'état de l'adresse email avec la valeur saisie dans l'input
    };

    const handleSenderChange = (e) => {
        setSender(e.target.value); // Met à jour l'état de l'ID du sender avec la valeur saisie dans l'input
    };

    const handleListContactChange = (e) => {
        setListContactId(e.target.value); // Met à jour l'état de l'adresse email avec la valeur saisie dans l'input
    };

    const handleSenderCompaignChange = (e) => {
        setSenderCompaignId(e.target.value); // Met à jour l'état de l'ID du sender avec la valeur saisie dans l'input
    };

    const handleOptionChange = (event, value) => {
        console.log(options_value[value]);
        setSelectedOption(value); // Met à jour l'option sélectionnée
    };

    const handleDeleteTransaction = () => {
        const newEditorState = EditorState.createEmpty(); // Réinitialise l'éditeur avec un nouvel état vide
        setEditorState(newEditorState);
        setEmail(''); // Vide le champ d'adresse e-mail
        setSender(''); // Vide le champ d'ID du sender
    };

    const handleDeleteCampaing = () => {
        const newEditorState = EditorState.createEmpty(); // Réinitialise l'éditeur avec un nouvel état vide
        setEditorState(newEditorState);
        setSenderEmail(''); // Vide le champ d'adresse e-mail
        setSenderName(''); // Vide le champ d'ID du sender
    };
    const handleClickSend = async () => {                                       // Récupère le contenu de l'éditeur
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {                                          // Vérifie si le contenu est vide
            setWarning(true);                                                   // Affiche un avertissement
            return;                                                             // Arrête l'exécution de la fonction
        }

        const plainTextContent = contentState.getPlainText();                   // Convertit le contenu de l'éditeur en texte clair

        const htmlContent = stateToHTML(contentState);                         // Convertit le contenu de l'éditeur en HTML

        // Récupère les emails et les nettoie
        const emails = email.split(',').map(email => email.trim());
        if (!emails.length) {
            console.error('No recipient email provided');
            return;
        }
        const emailList = [];  // Tableau pour stocker les e-mails
        for (const email of emails) {
            emailList.push(email);  // Ajoute l'e-mail au tableau
        }

        const jsonContent = JSON.stringify({ plainTextContent, htmlContent, emails: emailList, selectedOption, sender });
        console.log("jsondata before sending:", jsonContent);

        try {
            const response = await fetch('http://127.0.0.1:8000/myapp/get-content/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonContent
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const result = await response.json();
            const updatedJsonContent = { ...JSON.parse(jsonContent), result };
            console.log("jsondata after sending:", JSON.stringify(updatedJsonContent))
            setMessageSent(true);
            setWarning(false);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleClickSendCompaign = async () => {                                       // Récupère le contenu de l'éditeur
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {                                          // Vérifie si le contenu est vide
            setWarning(true);                                                   // Affiche un avertissement
            return;                                                             // Arrête l'exécution de la fonction
        }

        const plainTextContent = contentState.getPlainText();                   // Convertit le contenu de l'éditeur en texte clair

        const htmlContent = stateToHTML(contentState);                         // Convertit le contenu de l'éditeur en HTML

        // Récupère les emails et les nettoie
        const emails = email.split(',').map(email => email.trim());
        if (!emails.length) {
            console.error('No recipient email provided');
            return;
        }
        const emailList = [];  // Tableau pour stocker les e-mails
        for (const email of emails) {
            emailList.push(email);  // Ajoute l'e-mail au tableau
        }

        const jsonContent = JSON.stringify({ plainTextContent, htmlContent, emails: emailList, selectedOption, sender });
        console.log("jsondata before sending:", jsonContent);

        try {
            const response = await fetch('http://127.0.0.1:8000/myapp/send-compaign/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonContent
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const result = await response.json();
            const updatedJsonContent = { ...JSON.parse(jsonContent), result };
            console.log("jsondata after sending:", JSON.stringify(updatedJsonContent))
            setMessageSent(true);
            setWarning(false);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <label htmlFor="sender">Sender ID:</label>
            <input type="text" id="sender" name="sender" placeholder="Enter sender ID" value={sender} onChange={handleSenderChange} />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
            <Button onClick={handleDeleteTransaction} variant="outlined" startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Button onClick={handleClickSend} variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
            
                <br />
                <label htmlFor="sendercp">Sender Cp:</label>
                <input type="text" id="sendercp" name="sendercp" placeholder="Enter sender ID" value={senderCompaignId} onChange={handleSenderCompaignChange} />
                <label htmlFor="emailcp">Email:</label>
                <input type="text" id="emailcp" name="emailcp" placeholder="Enter list contact ID" value={listContactId} onChange={handleListContactChange} />
                <Button onClick={handleDeleteCampaing} variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button onClick={handleClickSendCompaign} variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>

            <SenderDropdown />
            {/* <Autocomplete
                value={selectedOption}
                onChange={handleOptionChange}
                id="select-option"
                options={options}
                renderInput={(params) => <TextField {...params} label="Select Option" />}
            /> 
            {warning && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning">Le contenu de l'éditeur est vide.</Alert>
                </Stack>
            )}
            {messageSent && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">Message sent</Alert>
                </Stack>
            )}
        </>
    );
};

export default EditorOptionRich;
*/} 