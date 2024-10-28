// src/GoogleFormCharts.js
//const API_KEY = 'AIzaSyDbbNnGPqye_hlbgoFcNsguC0Xqra2MNLg'; // Replace with your actual API key
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import styles from '../styles/googleFormsCharts.module.css';

const GoogleFormCharts = () => {
  const [chartData, setChartData] = useState([]);
  const [comments, setComments] = useState([]); // State to hold comments
  const [loading, setLoading] = useState(true);
  const SHEET_ID = '1pMeF5lInOVzAcjjeOHH0j_gB1QciD1_qgthHrycaGGw'; // Your Sheet ID
  const API_KEY = 'AIzaSyDbbNnGPqye_hlbgoFcNsguC0Xqra2MNLg'; // Replace with your actual API key

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Respuestas?key=${API_KEY}`
            );

            const rows = response.data.values;
            if (rows.length > 0) {
                // Assuming first row is headers
                const headers = rows[0];
                const data = rows.slice(1);

                // Filter out indices for "Eficiencia del Asistente", "Satisfacción", and "Otros aportes o comentarios"
                const efficiencyIndex = headers.indexOf("Eficiencia del Asistente");
                const satisfactionIndex = headers.indexOf("Satisfacción");
                const commentsIndex = headers.indexOf("Otros aportes o comentarios");

                // Prepare data for both charts
                const efficiencyData = [["Respuesta", "Eficiencia del Asistente"]];
                const satisfactionData = [["Respuesta", "Satisfacción"]];
                const commentsList = []; // Array to hold comments

                data.forEach(row => {
                    if (row[efficiencyIndex] !== undefined) {
                        efficiencyData.push([row[0], Number(row[efficiencyIndex])]); // Assuming the first column is an identifier
                    }
                    if (row[satisfactionIndex] !== undefined) {
                        satisfactionData.push([row[0], Number(row[satisfactionIndex])]); // Assuming the first column is an identifier
                    }
                    if (row[commentsIndex] !== undefined) {
                        commentsList.push(row[commentsIndex]); // Add comment to the list
                    }
                });

                setChartData({ efficiencyData, satisfactionData });
                setComments(commentsList); // Set comments state
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);

if (loading) return <div>Loading...</div>;

return (
    <div>
        <h2 className={styles.title}>Resultados de la Encuesta</h2>
        {chartData.efficiencyData.length > 1 && (
            <div style={{ marginBottom: '40px' }}>
                <h3 className={`${styles.title} ${styles.heading}`}>Eficiencia del Asistente</h3>
                <Chart
                    chartType="BarChart" // Change this to your desired chart type
                    width="100%"
                    height="400px"
                    data={chartData.efficiencyData}
                    options={{
                        title: 'Eficiencia del Asistente',
                        hAxis: { title: 'Respuestas' },
                        vAxis: { title: 'Calificación' },
                        legend: 'none',
                    }}
                />
            </div>
        )}
        {chartData.satisfactionData.length > 1 && (
            <div>
                <h3 className={`${styles.title} ${styles.heading}`}>Satisfacción</h3>
                <Chart
                    chartType="BarChart" // Change this to your desired chart type
                    width="100%"
                    height="400px"
                    data={chartData.satisfactionData}
                    options={{
                        title: 'Satisfacción',
                        hAxis: { title: 'Respuestas' },
                        vAxis: { title: 'Calificación' },
                        legend: 'none',
                    }}
                />
            </div>
        )}

        {/* Button to navigate to another page */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link href="/dasboard">
                <button className={styles.button}>Dejar una Reseña</button>
            </Link>
        </div>
        
        {/* Displaying Comments */}
        <div className={styles.commentsContainer}>
            <h3 className={`${styles.title} ${styles.heading}`}>Reseñas</h3>
            <div className={styles.commentBoxContainer}>
                {comments.map((comment, index) => (
                    <div key={index} className={styles.commentBox}>
                        {comment}
                    </div> // Display each comment in a styled box
                ))}
            </div>
        </div>
    </div>
);
};

export default GoogleFormCharts;