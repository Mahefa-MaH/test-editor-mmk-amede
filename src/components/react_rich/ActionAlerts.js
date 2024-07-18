import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function ActionAlerts({ warning, messageSent }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (warning || messageSent) {
      setShowAlert(true);

      // Cacher l'alerte après 5 secondes
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => {
        clearTimeout(timer); // Nettoyer le timer lors du démontage du composant
      };
    }
  }, [warning, messageSent]);

  return (
    <Stack sx={{ position: 'absolute', bottom: '-100px', left: 10, width: '20%' }} spacing={2}>
      {showAlert && (
        <>
          {warning && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              Echec, sélectionner la date futur
            </Alert>
          )}
          {messageSent && (
            <Alert severity="success" onClose={() => setShowAlert(false)}>
              Succes, le date futur message bien envoyé
            </Alert>
          )}
        </>
      )}
    </Stack>
  );
}
