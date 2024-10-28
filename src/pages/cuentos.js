// pages/index.js
import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import FirebaseApp from './api/firebaseConfig'; // Ensure this path is correct
import styles from '../styles/consultas.module.css';

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null); // State for the selected file's URL
  const storage = getStorage(FirebaseApp); // Initialize storage

  useEffect(() => {
    const fetchFiles = async () => {
      const listRef = ref(storage, 'Cuentos'); // Reference to the folder

      try {
        const res = await listAll(listRef); // List all files in the folder
        const filePromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef); // Get download URL
          return { name: itemRef.name, url }; // Return object with name and URL
        });
        const filesList = await Promise.all(filePromises); // Wait for all promises to resolve
        setFiles(filesList); // Update state with the list of files
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [storage]);

  const handleFileClick = (url) => {
    setPreviewUrl(url); // Set the preview URL when a file is clicked
  };

  return (
    <div className={styles.container}>
      <h1>Cuentos Infantiles</h1>
      <div className={styles.cardContainer}>
        {files.map((file) => (
          <div className={styles.card} key={file.name} onClick={() => handleFileClick(file.url)}>
            <h2>{file.name}</h2>
            <a href={file.url} target="_blank" rel="noopener noreferrer">Descargar</a>
          </div>
        ))}
      </div>

      {/* Preview active */}
      {previewUrl && (
        <div className={styles.previewContainer}>
          <h2>Vista Previa:</h2>
          <iframe 
            src={previewUrl} 
            title="Vista Previa" 
            className={styles.previewIframe}
            width="100%" 
            height="600px" 
            style={{ border: 'none' }} 
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;