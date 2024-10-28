// Componente para consultar archivo desde Firebase Storage (StorageFileView.js)
import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storageBucket } from './firebaseConfig';

const StorageFileView = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        // Referencia al archivo en tu Firebase Storage
        const fileRef = ref(storageBucket, 'https://firebasestorage.googleapis.com/v0/b/a-bee-sees.appspot.com/o/CNB%20MINEDUC%2FCNB-NIVEL-PREPRIMARIO.pdf?alt=media&token=56acf7af-08be-4638-af36-92acd64538f5'); // Reemplaza por la ruta correcta de tu archivo

        // Obtén la URL de descarga
        const url = await getDownloadURL(fileRef);

        // Almacena la URL en el estado
        setFileUrl(url);
      } catch (error) {
        console.error('Error al obtener el archivo:', error);
        setError(error.message);
      }
    };

    fetchFileUrl();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Archivo desde Firebase Storage</h1>
      {fileUrl ? (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          Descargar archivo
        </a>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default StorageFileView;
