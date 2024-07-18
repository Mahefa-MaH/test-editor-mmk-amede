import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Bouton from './Bouton';
import Champ from './Champ';

export default function React_Quill() {
  const [convertedText, setConvertedText] = useState("ecrire le text...");
  const [email, setEmail] = useState('');
  const [sender_email, setSenderEmail] = useState('');
  const [plainTextContent, setPlainTextContent] = useState('');

  const handleClickSend = async () => {
  const emails = email.split(',').map(email => email.trim());
    if (!emails.length) {
      console.error('No recipient email provided');
      return;
    }
    // Obtenir le contenu texte brut de l'éditeur riche
 
    const emailList = [];
    for (const email of emails) {
      emailList.push(email);
    }

    const jsonContent = JSON.stringify({ plainTextContent, htmlContent: convertedText, emails: emailList, sender_email });
    console.log("jsondata before sending:", jsonContent);

    // Ajoutez ici votre logique pour envoyer les données
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '50vh' }}>
      <ReactQuill
        theme='snow'
        value={convertedText}
        onChange={setConvertedText}
        style={{ width: '50%', height: '200px', minHeight: '100px' }}
      />
      <div style={{ marginTop: '20px' }}>
        <Champ setEmail={setEmail} setSenderEmail={setSenderEmail} />
        <Bouton email={email} sender={sender_email} handleClickSend={handleClickSend} />
      </div>
    </div>
  );
}
