{/*import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';

const EditorContent = ({ editorState, onEditorStateChange }) => {

    const uploadImageCallBack = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({ data: { link: reader.result } });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleContentChange = newEditorState => {
        onEditorStateChange(newEditorState);
        const contentState = newEditorState.getCurrentContent();
        console.log(stateToHTML(contentState));
    };

    return (
        <div className="editor">
            <Editor
                editorState={editorState}
                onEditorStateChange={handleContentChange}
                toolbar={{
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
            />
        </div>
    );
};

export default EditorContent;
*/}