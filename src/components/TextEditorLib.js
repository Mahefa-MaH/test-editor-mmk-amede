{/*import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import './TextEditorLib.css';                                       // Import du fichier CSS pour les styles personnalisés
import { stateToHTML } from 'draft-js-export-html';

class TextEditorLib extends Component {
    state = {                                                       // Initialisation de l'état du composant
        editorState: EditorState.createEmpty(),                     // Crée un état d'éditeur vide
        messageSent: false,                                         // Indique si un message a été envoyé
        showError: false,                                           // Indique si le message d'erreur doit être affiché
    };

    onEditorStateChange = (editorState) => {                        // Fonction appelée lorsqu'il y a un changement dans l'état de l'éditeur
        this.setState({ editorState });                             // Met à jour l'état de l'éditeur
    };

    afficherErreur = () => {                                        // Fonction pour afficher le message d'erreur
        this.setState({ showError: true });                         // Affiche le message d'erreur
 
        setTimeout(() => {                                          // Masque le message d'erreur après 10 secondes
            this.setState({ showError: false });
        }, 10000);                                                  // Affiche le message d'erreur pendant 10 secondes
    };

    handleClick = () => {
        const { editorState } = this.state;
        const content = editorState.getCurrentContent().getPlainText();
        if (content.trim() === '') {                                // Si le contenu de l'éditeur est vide, affiche un message d'erreur
            this.afficherErreur();                                  // Affiche le message d'erreur si le champ est vide
            return;
        }

        // Reste de notre logique pour envoyer le contenu

        console.log("Contenu en texte brut:", content);             // Affiche le contenu en texte brut dans la console
        const jsonContent = JSON.stringify({ content });            // Convertit le contenu en JSON et l'affiche dans la console
        console.log("Contenu au format JSON:", jsonContent);
        console.log(stateToHTML(editorState.getCurrentContent()));  // Affiche le contenu de l'éditeur au format HTML dans la console


        this.setState({ messageSent: true, showError: false });     // Met à jour l'état pour indiquer qu'un message a été envoyé et masque le message d'erreur
    };

    handleClickCancel = () => {                                     // Réinitialise l'éditeur lorsque le bouton "Annuler" est cliqué
        this.resetEditor();
    };

    resetEditor = () => {                                           // Réinitialise l'état de l'éditeur à vide
        this.setState({ editorState: EditorState.createEmpty(), messageSent: false });
    };

    render() {
        const { editorState, messageSent, showError } = this.state;

        return (
            <div className="text-editor">
                <div className="editor">
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={this.onEditorStateChange}
                        placeholder='Entrer votre texte ici...'
                    />
                </div>
                <div className="button-container">
                    <button className="stretchable-button send" onClick={this.handleClick}><strong>Envoyer</strong></button>
                    <button className="stretchable-button cancel" onClick={this.handleClickCancel}><strong>Annuler</strong></button>

                 
                </div>
                    {messageSent && <p className="message-received"><strong>Votre message est bien reçu</strong> 👍</p>}
                    {showError && <p className="error-message"><strong>Veuillez remplir ce champ</strong> ⚠️</p>}
                    <textarea className='text-area' style={{ display: 'none' }}      // Cacher le textarea
                        value={stateToHTML(editorState.getCurrentContent())}        // Contenu HTML à afficher dans la console
                        onChange={(e) => console.log(e.target.value)}               // Afficher le contenu dans la console
                    >
                    </textarea>

            </div>
        );
    }
}

export default TextEditorLib;

*/}