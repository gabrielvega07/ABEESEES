// src/GoogleFormEmbed.js
import React from 'react';
import FormfacadeEmbed from '@formfacade/embed-react';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdN8_aD4v5t55RXOqezsyTKNSTDOCwoaqaTSAyZwqN2zttUWg/viewform?usp=sf_link"; // Replace with your actual Formfacade URL

const GoogleFormEmbed = () => {
  const handleFormSubmit = () => {
    console.log("Form submitted!");
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Encuesta</h2>
      <p>Por favor, completa la encuesta a continuación:</p>
      <FormfacadeEmbed 
        formFacadeURL={GOOGLE_FORM_URL} 
        onSubmitForm={handleFormSubmit} 
      />
    </div>
  );
};

export default GoogleFormEmbed;