// components/Footer.js
import React from 'react';
import styles from '../styles/piepagina.module.css'; // Asegúrate de que esta ruta sea correcta

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} A BEE SEES. Todos los derechos reservados.</p>
        <p>
          <a href="/privacy-policy">Política de privacidad</a> | 
          <a href="/terms-of-service"> Términos de servicio</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;