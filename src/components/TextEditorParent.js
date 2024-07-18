// TextEditorParent.js
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import EditorContentRich from './react_rich/EditorContentRich';
//import Sexe from './react_rich/Sexe'

const TextEditorParent = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());  // État local pour l'éditeur et le texte
    const [text, setText] = useState('');

    const onEditorStateChange = (editorState) => {                              // Fonction appelée lorsque l'état de l'éditeur change
        setEditorState(editorState);
    };

    const handleSetText = () => {                                               // Fonction pour extraire le texte brut de l'éditeur
        const contentState = editorState.getCurrentContent();
        const plainText = contentState.getPlainText();
        setText(plainText);
    };

    return (
        <div>
             <EditorContentRich editorState={editorState} onEditorStateChange={onEditorStateChange} text={text} />
        </div>
    );
};

export default TextEditorParent;
