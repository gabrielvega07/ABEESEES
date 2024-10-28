// components/Navbar.js
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import styles from '../styles/Navbar.module.css'; // Ensure this path is correct

const Navbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // List of pages for autocomplete
  const pages = [
    { name: 'Inicio', path: '/home' },
    { name: 'Consultar Planificaciones', path: '/consultarPlanificaciones' },
    { name: 'Cantos', path: '/cantos' },
    { name: 'CNB Oficial', path: '/CNB' }, 
    { name: 'Cuentos', path: '/cuentos' }, 
    { name: 'Juegos', path: '/juegos' }, 
    { name: 'Rondas', path: '/rondas' },
    { name: 'Hojas de Trabajo', path: '/hojasTrabajo'},
    { name: 'Taxonomía', path: '/taxonomiaBlum' },
    { name: 'Consultar con IA', path: '/chatgpt' },
    { name: 'Reseñas del Asistente', path: '/charts'},
    { name: 'Agregar una Reseña', path: '/dasboard'}
  ];

  // Handle change in search bar
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle page selection on autocomplete click
  const handleSelectPage = (path) => {
    router.push(path);
    setSearchTerm(''); // Clear search bar after selection
  };

  // Handle log out action
  const handleLogout = () => {
    // Here you can add any logout logic if needed (e.g., clearing tokens)
    
    // Redirect to the login page (index)
    router.push('/'); // Assuming index.js is your login page
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <ul className={styles.navLinks}>
          <li><a href="/home">Inicio</a></li>
          <li><a href="/consultarPlanificaciones">Consultar Planificaciones</a></li>
          <li><a href="/cantos">Cantos</a></li>
          <li><a href="/CNB">CNB Oficial</a></li>
          <li><a href="/taxonomiaBlum">Taxonomía de Bloom</a></li>
          <li><a href="/cuentos">Cuentos Infantiles</a></li>
          <li><a href="/juegos">Juegos</a></li>
          <li><a href="/rondas">Rondas</a></li>
          <li><a href="/hojasTrabajo">Hojas de Trabajo</a></li>
          <li><a href="/chatgpt">Consultar con IA</a></li>
          <li><a href="/charts">Reseñas</a></li>
          <li><a href="/dasboard">Encuesta</a></li>
        </ul>

        {/* Search Container */}
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className={styles.searchInput}
          />
          {searchTerm && (
            <ul className={styles.autocompleteList}>
              {pages.filter(page => page.name.toLowerCase().includes(searchTerm.toLowerCase())).map((page) => (
                <li key={page.path} onClick={() => handleSelectPage(page.path)}>{page.name}</li>
              ))}
            </ul>
          )}
        </div>

        
        {/* Log Out Button */}
        <button className={styles.logoutButton} onClick={handleLogout}>
          Log Out
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;