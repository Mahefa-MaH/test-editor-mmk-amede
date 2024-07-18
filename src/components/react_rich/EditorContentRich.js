import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box, Button, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fr } from 'date-fns/locale';
import { RichTextEditorComponent, Inject, Link, Image, HtmlEditor, Toolbar, QuickToolbar, Table, EmojiPicker } from '@syncfusion/ej2-react-richtexteditor';
import { EditorState, convertToRaw } from 'draft-js'; // Import des fonctions EditorState et convertToRaw de draft-js
import ChampInputCamp from './ChampInputCamp'; // Import du composant ChampInputCamp
import BoutonRichCamp from './BoutonRichCamp'; // Import du composant BoutonRichCamp
import { ContentState, convertFromHTML } from 'draft-js'; // Import des fonctions ContentState et convertFromHTML de draft-js
import Sexe from './Sexe'; // Import du composant Sexe
import Filtre from './Filtre'; // Import du composant Filtre
import PriceFilter from './PriceFilter'; // Import du composant PriceFilter
import ListContact from './ListContact'; // Import du composant ListContact
import NombreCommande from './NombreCommande'; // Import du composant NombreCommande
import ListeContactCamp from './ListeContactCamp'; // Import du composant ListeContactCamp
import DateTime from './DateTime';
import ActionAlerts from './ActionAlerts';
import MontantTotal from './MontantTotal';
import EmailTemplate from './emailtemplate';
import { renderToString } from 'react-dom/server'; // Import de renderToString depuis react-dom/server


// Composant principal EditorTextRich
function EditorTextRich() {
     // Déclaration des états pour les données de l'éditeur
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [content, setContent] = useState('');
    const [email, setEmail] = useState('');
    const [sender_email, setSenderEmail] = useState('');
    const [sender_email_camp, setSenderEmailCamp] = useState('');
    const [campaign_name, setCampaignName] = useState('');
    const [sender_name_camp, setSenderNameCamp] = useState('');
    const [subject, setSubject] = useState('');
    const [messageSent, setMessageSent] = useState(false);
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const [htmlContent, setHtmlContent] = useState('');
    // const [plainTextContent, setPlainTextContent] = useState('');
    const [genre, setGenre] = useState('tous');
    const [min_age, setMinAge] = useState(1);
    const [max_age, setMaxAge] = useState(100);
    const [mincom, setMinCom] = useState(1);
    const [maxcom, setMaxCom] = useState(100);
    const [minmont, setMinMont] = useState(100);
    const [maxmont, setMaxMont] = useState(10000000);
    const [personName, setPersonName] = useState('');
    const [persons, setPerson] = useState([]);
    const [emailcamps, setEmailCamp] =useState('');
    const [emailName, setEmailName] =useState('');
    const [result_filtre, setResultFiltre] =useState('');
    const [email_Sender, setEmailSender] = React.useState([]);
    const [scheduleAt, setScheduleAt] =useState('');
    const [warning, setWarning] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);
  
     // Fonction de gestion du changement de l'email de l'expéditeur
    const handleSenderlChange = (email_Sender) => {
        setEmailSender(email_Sender)
        console.log("email sender sélectionné :",email_Sender );
    }

    // Fonction de gestion du changement de l'email
    const handleEmailChange = (emailcamp) => {
        setEmailCamp(emailcamp) 
    console.log("email sélectionnée :", emailcamps);
    };

    // Fonction de gestion du changement de personne dans le composant parent de ListeContactCamp
    const handleNameChange = (person) => {
    // Logique de gestion du changement de personne
    setPerson(person)
    console.log("Personne email sélectionnée :", persons);
    };
    
    const handleDateChange = (date) => {
        setScheduleAt(date)
        console.log("date à envoyer",scheduleAt);
    }
    // Fonction de réinitialisation des champs du filtre
    const handleDelete = () => {
        setGenre('');
        setMinAge('');
        setMaxAge('');
        setMinCom('');
        setMaxCom('');
        setPersonName('');
        setEmailName('');
        setMinMont('');
        setMaxMont('');
         
    // Réinitialiser l'éditeur de texte
    setEditorState(EditorState.createEmpty());
        console.log("Filtre supprimé");
    };
    
 
     // Fonction pour gérer l'envoi du filtre
    const handleSend = async () => {
        console.log("Sexe :", genre);
        console.log("Min Price:", min_age);
        console.log("Max Price:", max_age);
        console.log("Min commande Price:", mincom);
        console.log("Max commande Price:", maxcom);
        console.log("list contact:", personName);
        console.log("list email:", emailName);
        console.log("Min montant:", minmont);
        console.log("Max montant:",maxmont);

    // Autres actions à effectuer lors de l'envoi du filtre
    const jsonContent = JSON.stringify({ 
        Sexe: genre,  
        min_age, 
        max_age,
        emailName, 
        personName, 
        min_nbr_cmd: mincom, 
        max_nbr_cmd: maxcom,
        min_montant_total: minmont, 
        max_montant_total: maxmont
    });
    console.log("jsondata before sending:", jsonContent);
    try {
        const url = new URL('http://127.0.0.1:8000/auto_mailing/cible-marketing-filter');
        url.searchParams.append('genre', genre);
        url.searchParams.append('min_age', min_age);
        url.searchParams.append('max_age', max_age);
        url.searchParams.append('personName', personName);
        url.searchParams.append('min_nbr_cmd', mincom);
        url.searchParams.append('max_nbr_cmd', maxcom);
        url.searchParams.append('emailName', emailName);
        url.searchParams.append('min_mont',minmont);
        url.searchParams.append('max_mont', maxmont);

        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        const resp = await response.json();
        setResultFiltre(resp)
        const updatedJsonContent = { ...JSON.parse(jsonContent), result_filtre };
        console.log("jsondata after sending:", JSON.stringify(updatedJsonContent))

    } catch (error) {
        console.error('Error sending message:', error);
    }
};


    // Fonction de gestion du changement de genre
    const handleGenreChange = (selectedGenre) => {
        setGenre(selectedGenre);
        console.log("Genre sélectionné :", selectedGenre);
    };
    const handleMinChange = (newValue) => {
        setMinAge(newValue);
    };
  
    const handleMaxChange = (newValue) => {
        setMaxAge(newValue);
    };
    const handleMinCommandeChange = (newValue) => {
        setMinCom(newValue);
    };
  
    const handleMaxCommandeChange = (newValue) => {
        setMaxCom(newValue);
    };

    const handleMinMontChange = (newValue) => {
        setMinMont(newValue);
    }

    const handleMaxMontChange = (newValue) => {
        setMaxMont(newValue);
    }
    // Fonction pour gérer le changement de liste du contact
    const handlepersonNameChange = (selectedpersonName) => {
        setPersonName(selectedpersonName);
        console.log("Contact sélectionné :", selectedpersonName);
    };
    const handleemailNameChange = (selectedemailname) => {
        setEmailName(selectedemailname);
        console.log("email sélectionné :", selectedemailname);
    };
  
    const handleClickSend = async () => {
        const emails = email.split(',').map(email => email.trim());
        if (!emails.length) {
            console.error('No recipient email provided');
            return;
    }

    const emailList = [];
    for (const email of emails) {
        emailList.push(email);
    }

    const jsonContent = JSON.stringify({ 
        // plainTextContent, 
        htmlContent, 
        emails: emailList, 
        sender_email 
    });
        console.log("jsondata before sending:", jsonContent);

    try {
            const response = await fetch('http://127.0.0.1:8000/auto_mailing/send-transaction', {
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

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const handleClickDeleteCamp = () => {
        
         // Réinitialiser tous les champs du formulaire et l'interface de l'éditeur
        setSenderEmailCamp('');
        setCampaignName('');
        setSenderNameCamp('');
        setPerson('');
        setPersonName([]);
        setSubject('');
        
        // Réinitialiser l'éditeur de texte
        setEditorState(EditorState.createEmpty());
        console.log("Campagne supprimée");
    };
   
    
    // Fonction pour gérer l'envoi de la campagne
    const handleClickSendCamp = async () => {
    
    // Récupère les emails et les nettoie
    const emails = campaign_name.split(',').map(email => email.trim());
        if (!emails.length) {
            console.error('No recipient email provided');
            return;
    }
    // Récupère la date et l'heure actuelles
    const currentDate = new Date();

    // Vérifie si la date sélectionnée est antérieure ou égale à la date actuelle
    if (scheduleAt <= currentDate) {
        // Date passée
        setWarning(true); // Afficher l'alerte d'échec
        setMessageSent(false); // Cacher l'alerte de succès
        console.error('La date sélectionnée doit être dans le futur');
        return;
    } else {
        // Date future
        setWarning(false); // Cacher l'alerte d'échec
        setMessageSent(true); // Afficher l'alerte de succès
    }

    // Générer le contenu HTML de l'éditeur de texte avec le contenu dynamique
    const htmlContent = renderToString(<EmailTemplate content={content} />);
    console.log("html_content :   ", htmlContent);

    const jsonContent = JSON.stringify({ 
        // plainTextContent, 
        htmlContent,
        email_Sender: email_Sender, 
        emailcamps: emailcamps, 
        emails_receiver: persons,  
        campaign_name,
        sender_email:sender_email_camp, 
        list_name:sender_name_camp ,
        scheduleAt: scheduleAt,
        subject: subject,
        // content: content,
    });
        console.log("jsondata before sending:", jsonContent);

    try {
            const response = await fetch('http://127.0.0.1:8000/auto_mailing/create-cible-marketing', {
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

            const resp = await response.json();
            const updatedJsonContent = { ...JSON.parse(jsonContent), resp };
            console.log("jsondata after sending:", JSON.stringify(updatedJsonContent))
            setMessageSent(true);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
  
    // Fonction pour gérer l'envoi de la campagne
    const handleChange = (e, setEditorState,) => {
        try{
            const blocksFromHTML = convertFromHTML(e.value || '');
            const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);     
            setEditorState(EditorState.createWithContent(state)); 
        }
        catch(e){
            console.log(e);
        } 
    };

    const handleDateChangeInternal = (date) => {
        setSelectedDate(date);
        handleDateChange(date);
      };

     // Effet pour mettre à jour le contenu HTML et le texte brut
    useEffect(() => {
        // console.log("HTML content:", content);
        if (content) {
            const text = document.createElement('div');
            text.innerHTML = content;
            // const plainText = text.innerText;
            setHtmlContent(content);
            // setPlainTextContent(plainText);
            const rawContentState = convertToRaw(contentState);
        }   
    }, [content,editorState,contentState]); // Utilisez un seul tableau pour les dépendances

    return (
        <Stack spacing={2}
            direction='column'
            sx={{
            border: '3px solid #ccc',
            borderRadius: '10px',
            padding: '5px',
            minWidth: '800px',
            width: '80%',
            alignItems: 'center', // Center aligns children horizontally
            justifyContent: 'center', // Center aligns children vertically
            margin: '0 auto', // Centers the Stack component itself horizontally
            }}>
            <RichTextEditorComponent
                value={content}
                change={(e) => {
                setContent(e.value);
                handleChange(e, setEditorState);
                }}
                height={450}
                toolbarSettings={{
                items: ['Bold', 'cut', 'video', 'CreateTable', 'Image', 'Italic', 'Underline', 'StrikeThrough', 'FontName', 'FontSize', 'FontColor', 'BackgroundColor', 'LowerCase', 'UpperCase', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList', 'Outdent', 'Indent', '|', 'CreateLink', '|', 'ClearFormat', 'Print', 'SourceCode', 'EmojiPicker', 'FullScreen', '|', 'Undo', 'Redo'],
                type: 'MultiRow'
                }}
                quickToolbarSettings={{
                table: ['TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-', 'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign', 'Styles']
                }}
            >
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table, EmojiPicker]} />
            </RichTextEditorComponent>

            <Stack direction="row"
                spacing={2}
                sx={{
                width: '100%',
                minWidth: '800px',
                alignItems: 'center', // Center aligns children horizontally
                justifyContent: 'center', // Center aligns children vertically
                margin: '0 auto', // Centers the Stack component itself horizontally
                }}
                >
                <Stack direction="column"
                    spacing={2}
                    sx={{
                    border: '3px solid #ccc',
                    borderRadius: '20px',
                    padding: '5px',
                    alignItems: 'center', // Center aligns children horizontally
                    justifyContent: 'center', // Center aligns children vertically
                    margin: '0 auto', // Centers the Stack component itself horizontally
                    }}
                    >
                    <Sexe handleGenreChange={handleGenreChange} />
                    <PriceFilter handleMinChange={handleMinChange} handleMaxChange={handleMaxChange} />
                    <NombreCommande handleMinCommandeChange={handleMinCommandeChange} handleMaxCommandeChange={handleMaxCommandeChange} />
                    <MontantTotal handleMinMontChange={handleMinMontChange} handleMaxMontChange={handleMaxMontChange} />
                    
                    {result_filtre && (
                    <ListContact result={result_filtre} handlepersonNameChange={handlepersonNameChange} />
                    )}
                    
                    <Filtre handleDelete={handleDelete} handleSend={handleSend} />
                </Stack>
                <Stack direction="column" spacing={2}
                    sx={{
                    border: '3px solid #ccc',
                    borderRadius: '10px',
                    padding: '5px',
                    minWidth: '500px',
                    minHeight: '400px',
                    alignItems: 'center', // Center aligns children horizontally
                    justifyContent: 'center', // Center aligns children vertically
                    margin: '0 auto', // Centers the Stack component itself horizontally
                    }}>
                        <ChampInputCamp
                            setSenderEmailCamp={setSenderEmailCamp}
                            setListContactId={setCampaignName}
                            setSenderNameCamp={setSenderNameCamp}
                            setSubject={setSubject}
                        />
                        <Stack direction="column" spacing={2}>
                            {/* <DateTime handleDateChange={handleDateChange} /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={fr}>
                                <DatePicker
                                    label="Select Date"
                                    value={selectedDate}
                                    onChange={handleDateChangeInternal}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <BoutonRichCamp handleClickDeleteCamp={handleClickDeleteCamp} handleClickSendCamp={handleClickSendCamp} />
                        </Stack>
                    </Stack>

                    <ActionAlerts warning={warning} messageSent={messageSent} />

                    <Stack direction="row" spacing={2}>
                    {result_filtre && (
                        <ListeContactCamp result={result_filtre} handleNameChange={handleNameChange} />
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
}

export default EditorTextRich;
