import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import FirebaseApp from './api/firebaseConfig'; 
import styles from '../styles/consultas.module.css'; 
import Footer from './Footer'; 
import CommentBox from './api/comentarios'; // Importar el nuevo componente
import { getFirestore } from "firebase/firestore"; 

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false); // Estado para mostrar el cuadro de comentarios
  const storage = getStorage(FirebaseApp);
  const db = getFirestore(FirebaseApp);

  const folders = [
    'Parvulos 1',
    'Párvulos 2',
    'Párvulos 3'
  ];

  const fetchFiles = async (folder) => {
    const listRef = ref(storage, folder);

    try {
      const res = await listAll(listRef);
      const filePromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, url };
      });
      const filesList = await Promise.all(filePromises);
      setFiles(filesList);
    } catch (error) {
      console.error("Error al obtener los archivos:", error);
    }
  };

  const handleFolderChange = (event) => {
    const folder = event.target.value;
    setSelectedFolder(folder);
    fetchFiles(folder);
    setPreviewUrl('');
  };

  const handleFileSelect = (url) => {
    setPreviewUrl(url);
  };

  // Función para manejar la descarga y mostrar el cuadro de comentarios
  const handleDownloadClick = async (url) => {
    console.log("Descargando:", url);
    
    // Mostrar el cuadro de texto para comentarios
    setShowCommentBox(true);
    
    // Abrir la URL del archivo para descargar en una nueva pestaña
    window.open(url, "_blank");
  };

  return (
    <div className={styles.container}>
      <h1>Planificaciones Escolares</h1>
      <select className={styles.select} onChange={handleFolderChange} value={selectedFolder}>
        <option value="">Selecciona una carpeta</option>
        {folders.map((folder) => (
          <option key={folder} value={folder}>{folder}</option>
        ))}
      </select>
      <div className={styles.cardContainer}>
        {files.map((file) => (
          <div 
            className={styles.card} 
            key={file.name}
            onClick={() => handleFileSelect(file.url)} 
          >
            <h2>{file.name}</h2>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                handleDownloadClick(file.url); // Llamar a la función para descargar y mostrar el cuadro de comentarios
              }} 
              rel="noopener noreferrer"
            >
              Descargar
            </a>
          </div>
        ))}
      </div>
      
      {/* Mostrar el cuadro de comentarios si es necesario */}
      {showCommentBox && (
        <CommentBox onCommentSubmitted={() => setShowCommentBox(false)} />
      )}

      {/* Vista previa activa */}
      {previewUrl && (
        <div className={styles.previewContainer}>
          <h2>Vista Previa:</h2>
          <iframe 
            src={previewUrl} 
            title="Vista Previa" 
            className={styles.previewIframe}
          />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;