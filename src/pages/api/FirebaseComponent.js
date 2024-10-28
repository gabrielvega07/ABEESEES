import React, { useEffect, useState } from 'react';
import { FirebaseApp } from './firebaseConfig';
// Print Users from Firebase Firestore
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Importamos las funciones necesarias para trabajar con Firestore

const FirebaseComponent = () => {
  const [Users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore(FirebaseApp);
        const usersCollection = collection(db, 'Users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        setUsers(usersList);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Usuarios de Firebase Firestore</h1>
      <ul>
        {Users.map(user => (
          <li key={user.id}>
            <strong>Nombre:</strong> {user.name} <br />
            <strong>Correo:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FirebaseComponent;
