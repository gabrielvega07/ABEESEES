import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Importar Firestore

const CommentBox = ({ onCommentSubmitted }) => {
  const [comment, setComment] = useState(''); // Estado para el comentario
  const db = getFirestore(); // Inicializa Firestore
  console.log("Comentario:", getFirestore);

  const handleCommentSubmit = async () => {
    if (comment.trim() === '') return; // No enviar si está vacío

    try {
      await addDoc(collection(db, 'Comentarios'), {
        Texto: comment,
        Timestamp: new Date() // Agregar un timestamp si es necesario
      });
      console.log("Comentario agregado:", comment);
      setComment(''); // Limpiar el campo de comentario después de enviar
      onCommentSubmitted(); // Llamar a la función para manejar el comentario enviado
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  return (
    <div className="commentBox">
      <textarea 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Escribe tu comentario aquí..."
      />
      <button onClick={handleCommentSubmit}>Enviar Comentario</button>
    </div>
  );
};

export default CommentBox;