import React, { useState } from 'react';

const GoogleFormSurvey = () => {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdN8_aD4v5t55RXOqezsyTKNSTDOCwoaqaTSAyZwqN2zttUWg/viewform?usp=sf_link";
  const [showPreview, setShowPreview] = useState(false); // State to control preview visibility

  const handleTogglePreview = () => {
    setShowPreview(!showPreview); // Toggle the preview visibility
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Participa en nuestra encuesta</h2>
      <p>Haz clic en el botón de abajo para abrir la encuesta.</p>
      <button onClick={handleTogglePreview} style={buttonStyle}>
        {showPreview ? 'Cerrar Vista Previa' : 'Abrir Encuesta'}
      </button>

      {/* Conditionally render the iframe for preview */}
      {showPreview && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
          <iframe 
            src={formUrl.replace('/viewform', '/formResponse')} // Adjust URL for embedding
            title="Vista Previa de la Encuesta"
            width="100%"
            height="600px"
            style={{ border: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

// Optional: Add some basic styling for the button
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
}

export default GoogleFormSurvey;