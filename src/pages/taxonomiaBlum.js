// pages/index.js
import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import FirebaseApp from './api/firebaseConfig'; // Ensure this path is correct
import styles from '../styles/material.module.css'; // Import your CSS styles

const HomePage = () => {
  const [fileUrl, setFileUrl] = useState(null); // State to hold the file URL
  const storage = getStorage(FirebaseApp); // Initialize storage

  useEffect(() => {
    const fetchFile = async () => {
      const listRef = ref(storage, 'Taxonomia de Bloom'); // Reference to the folder

      try {
        const res = await listAll(listRef); // List all files in the folder
        if (res.items.length > 0) {
          const itemRef = res.items[0]; // Get the first (and only) document
          const url = await getDownloadURL(itemRef); // Get download URL
          setFileUrl(url); // Set the file URL in state
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFile();
  }, [storage]);

  return (
    <div className={styles.container}>
      <h1></h1>
      <h2>Dentro de este módulo podrá encontrar el CNB oficial emitido por el MINEDUC para el Nivel Preprimario, como una guía general para sus planificaciones y contenidos escolares.</h2>
      <div className={styles.previewContainer}>
        {fileUrl ? (
          <div className={styles.fileItem}>
            <h2>Documento: CNB Oficial</h2>
            {/* Display the document using an iframe */}
            <iframe 
              src={fileUrl} 
              title="CNB Oficial" 
              width="100%" 
              height="600px" 
              style={{ border: 'none' }} 
            />
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">Descargar</a>
          </div>
        ) : (
          <p>No hay archivos disponibles en esta carpeta.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;