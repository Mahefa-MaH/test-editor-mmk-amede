//import './App.css';                                   // Import des styles CSS de l'application depuis le fichier App.css
import React from 'react';                            // Import de React depuis la bibliothèque react
import TextEditorParent from './components/TextEditorParent';


function App() {                                      // Définition du composant fonctionnel App
  return (                                            // Rendu du composant
    <div className="App">
      <header className="App-header">
      </header>
      <TextEditorParent/>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
      </div>
    </footer>
  );
}

export default App;                                  // Export du composant App comme composant par défaut


