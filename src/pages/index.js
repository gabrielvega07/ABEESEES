// pages/login.js
import React, { useState } from 'react';
import { auth } from './api/firebaseConfig'; // Asegúrate de que esta ruta sea correcta
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css'; // Asegúrate de que esta ruta sea correct

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirigir a HomePage después del login exitoso
      router.push('./home'); // Asumiendo que HomePage está en la raíz
    } catch (err) {
      setError('Error en la autenticación. Verifica tus credenciales.');
      console.error(err);
    }
  };  

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;