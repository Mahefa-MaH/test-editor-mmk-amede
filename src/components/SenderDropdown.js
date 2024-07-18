// SenderDropdown.js

import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

const SenderDropdown = () => {

    const [senders, setSenders] = useState([]);
    const [options_value, setSelectedOption] = useState([]);

    useEffect(() => {
        fetchSenders();
    }, []);

    const handleOptionChange = (event, value) => {
        console.log(options_value[value]);
        setSelectedOption(value); // Met à jour l'option sélectionnée
    };


    const fetchSenders = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/myapp/get-sender/');
            if (!response.ok) {
                throw new Error('Failed to fetch senders');
            }
            const data = await response.json();
            setSenders(data.senders);
        } catch (error) {
            console.error('Error fetching senders:', error);
        }
    };

    return (
        <Autocomplete

            id="select-sender"
            onChange={handleOptionChange}
            options={senders}
            getOptionLabel={(option) => option.name} // Assuming sender object has a 'name' property
            renderInput={(params) => <TextField {...params} label="Select Sender" />}
        />
    );
};

export default SenderDropdown;
