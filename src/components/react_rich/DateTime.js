import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Assurez-vous d'importer les styles CSS du datepicker
import { setHours, setMinutes } from 'date-fns';
import { format } from 'date-fns'; // Importer la fonction de formatage de date de date-fns

const date = new Date('2017-06-01T12:30:00+02:00'); 
const formattedDate = date.toISOString();
console.log(formattedDate);// Résultat : "2017-06-01T10:30:00.000Z" 

const DateTime = ({ handleDateChange }) => {
  const [startDate, setStartDate] = useState(() => new Date()); // Initialiser avec la date et l'heure actuelles

  const handleDateSelection = (date) => {
    setStartDate(date);
    handleDateChange(date); // Appeler la fonction handleDateChange du composant parent
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  height: '5vh', paddingBottom: '20px' }}>
      <div style={{ marginTop: 'auto', marginLeft: '50px'}}>
        <DatePicker 
          selected={startDate}
          onChange={date => {
            setStartDate(date);
            handleDateChange(date); // Appeler la fonction handleDateChange du composant parent
          }}
          showTimeSelect
          minTime={setHours(setMinutes(new Date(), 0), 17)}
          maxTime={setHours(setMinutes(new Date(), 30), 20)}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    </div>
  );
};

export default DateTime;
