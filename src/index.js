import React from 'react';         // Import de React depuis la bibliothèque react
import './index.css';             // Import du fichier CSS index.css pour gérer les styles de l'application
import App from './App';          // Import du composant App depuis le fichier App.js
import {render} from 'react-dom'  // Import de la fonction render depuis la bibliothèque react-dom


render(                           // Rendu de l'application
                                  //Utilisation de React Strict Mode pour des vérifications supplémentaires pendant le développement   
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),  // L'élément HTML avec l'ID "root" où l'application sera rendue
);

