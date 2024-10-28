"use client"; // Ensure this is at the top of your file
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/chatIA.module.css'; // Import your CSS module

const ChatGPT = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [responseText, setResponseText] = useState(''); // State to store response

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return; // Don't send if empty
  
        const userMessage = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
  
        setLoading(true);
        setInput(''); 
        setResponseText(''); 
  
        const maxRetries = 5;
        let attempt = 0;
        const baseWaitTime = 2000;
        
        while (attempt < maxRetries) {
            try {
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: "gpt-3.5-turbo",
                        messages: [
                            {"role": "user", "content": input}
                        ]
                    },
                    {
                        headers: {
                            'Authorization': `Bearer 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`, // Replace with your API key
                            'Content-Type': 'application/json',
                        },
                    }
                );
    
                const assistantMessage = {
                    role: 'assistant',
                    content: response.data.choices[0].message.content,
                };
                setMessages((prevMessages) => [...prevMessages, assistantMessage]);
                setResponseText(assistantMessage.content); 
                break;
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    attempt++;
                    const waitTime = Math.pow(2, attempt) * baseWaitTime;
                    console.warn(`Rate limit hit, retrying in ${waitTime / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime)); 
                } else {
                    console.error("Error communicating with API:", error);
                    setResponseText("Error al obtener respuesta."); 
                    break;
                }
            } finally {
                if (attempt >= maxRetries) {
                    setLoading(false); // Stop loading after all retries
                }
            }
        }
        setLoading(false); // Stop loading after success or failure
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Chat con IA</h2>
            <div className={styles.messageContainer}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${styles.message} ${msg.role}`}>
                        <strong>{msg.role === 'user' ? 'Tú' : 'IA'}:</strong> {msg.content}
                    </div>
                ))}
                {loading && <div>IA está escribiendo...</div>}
            </div>
            <div className={styles.inputContainer}>
                <input 
                    type="text" 
                    className={styles.inputField} 
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder="Escribe tu mensaje aquí..."
                />
                <button className={styles.button} onClick={handleSendMessage}>Enviar</button>
            </div>

            {/* Text area to show the response */}
            <div style={{ marginTop: '20px' }}>
                <h3>Respuesta de IA:</h3>
                <textarea 
                    value={responseText} 
                    readOnly 
                    className={styles.responseTextArea}
                    placeholder="La respuesta aparecerá aquí..."
                />
            </div>
        </div>
    );
};

export default ChatGPT;