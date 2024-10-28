// pages/index.js

import React from 'react';
import { useRouter } from 'next/router'; // Importa useRouter
import styles from '../styles/Home.module.css'; // Asegúrate de que esta ruta sea correcta

const HomePage = () => {
  const router = useRouter(); // Inicializa useRouter

  const handleGenerateClick = () => {
    router.push('/consultarPlanificaciones'); // Redirige a la página consultarPlanificaciones
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.greeting}>Hello 👋</h1>
        <h1 className={styles.title}>Bienvenido a A BEE SEES</h1>
        <p className={styles.description}>
          A BEE SEES es una plataforma educativa innovadora diseñada para facilitar el aprendizaje y la enseñanza de manera interactiva y accesible. Nuestra plataforma está creada para conectar a estudiantes, docentes y administradores en un entorno digital colaborativo que optimiza la experiencia educativa a través de herramientas modernas y eficientes.
        </p>
        <button className={styles.generateButton} onClick={handleGenerateClick}>Generar</button>
      </div>
    </div>
  );
};

export default HomePage;