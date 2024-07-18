// EmailTemplate.js

import React from 'react';
const EmailTemplate = ({ content }) => {
  // Afficher le contenu de la prop content dans la console
  // console.log("Contenu de l'éditeur de texte :", content);
  
  return (
    <table id="customers">
      <tr>
        <th>
          <img src="https://moramarket.mg/imagesV0/assets/mail/morarewards/header-new.png" alt="my-photo" height={200} width="80%" />
        </th>
      </tr>
      <tr>
        <td>
          {/* "contenu de l'éditeur de text :" */}
          <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
          {/* Le contenu dynamique ici */}
        </td>
      </tr>
      <tr>
        <td>
          <div className="footer" style={{ backgroundImage: `url('https://moramarket.mg/imagesV0/assets/mail/morarewards/footer-new.png')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', paddingTop: '10px' }}>
          <div style={{marginLeft: '40px' }}>
            <h2 style={{ color: 'black' }}>Contact</h2>
              <a href="mailto:service.client@moramarket.mg" style={{ textDecoration: 'none', color: 'white !important' }}>service.client@moramarket.mg</a>
              <p style={{ color: 'black' }}>+261 38 16 777 78</p>
              <p><a href="https://moramarket.mg/about/mentions-legales" style={{ textDecoration: 'none', color: 'white !important' }}> Mention légales</a></p>
              <p> <a href="https://moramarket.mg/about/cgu" style={{ textDecoration: 'none', color: 'white !important' }}>Conditions générales d’utilisation</a> </p>
            </div>
            <h3 style={{ backgroundColor: 'transparent', color: 'black', display: 'flex', justifyContent: 'flex-end', width: '88%', marginTop: '-70px' }}>Suivez-nous</h3>
          <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'flex-end', width: '95%', marginTop: '-20px' }}>
              <a className="social-icon" style={{ textDecoration: 'none' }} href="https://www.facebook.com/moramarket.meta/" target="_blank">
                <img className="icon" width="30" height="30" src="https://moramarket.mg/imagesV0/assets/mail/morarewards/icons/FACEBOOK_ICON.png" />
              </a>
              <a className="social-icon" style={{ textDecoration: 'none' }} href="https://www.instagram.com/moramarket.meta/" target="_blank">
                <img className="icon" width="30" height="30" src="https://moramarket.mg/imagesV0/assets/mail/morarewards/icons/INSTA_ICON.png" />
              </a>
              <a className="social-icon" style={{ textDecoration: 'none' }} href="https://www.linkedin.com/company/mora-market" target="_blank">
                <img className="icon" width="30" height="30" src="https://moramarket.mg/imagesV0/assets/mail/morarewards/icons/LINKEDIN_ICON.png" />
              </a>
              <a className="social-icon" style={{ textDecoration: 'none', color: 'green' }} href="https://wa.me/261381677779?text=Bonjour, je cherche le service client s'il vous plaît." target="_blank">
                <img className="icon" width="30" height="30" src="https://moramarket.mg/imagesV0/assets/mail/morarewards/icons/WHATSAPP_ICON.png" />
              </a>
          </div>
            <p style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: '-5px' }}>#MORAMARKETMG</p>
          </div>
        </td>
      </tr>
    </table>
  );
};


export default EmailTemplate;
