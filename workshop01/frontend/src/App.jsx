import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const [image, setImage] = useState('');
  const [repo, setRepo] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/image`);
        if (res.data && res.data.filename) {
          setImage(res.data.filename);
        }
      } catch (err) {
        console.error('Error fetching image:', err);
      }
    };
    
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/repo`);
        if (res.data && res.data.repo) {
          setRepo(res.data.repo);
        }
      } catch (err) {
        console.error('Error fetching repo:', err);
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/messages`);
        if (res.data && Array.isArray(res.data.messages)) {
          const messages = res.data.messages;
          const randomIndex = Math.floor(Math.random() * messages.length);
          setMessage(messages[randomIndex]);
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    const fetchAll = async () => {
      await Promise.all([fetchImage(), fetchRepo(), fetchMessages()]);
    };

    fetchAll();
  }, [BASE_URL]);

  return (
    <>
      <div className="container">
        {image && (
          <img src={`${BASE_URL}/images/${image}`} alt="image" style={{ width: '60px', height: 'auto' }}/>
        )}
        {message && <h3>{message}</h3>}
      </div>
      {repo && (
        <div>
          Repository <a href={repo} target="_blank" rel="noopener noreferrer">{repo}</a>
        </div>
      )}
    </>
  )
}

export default App;
