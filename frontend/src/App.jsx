import React, { useEffect, useState, useRef } from 'react';

function App() {
 
  const [users, setUsers] = useState([]);
  
  const [inputUser, setInputUser] = useState({ username: '', email: '' });
  const ws = useRef(null);

  // Carga inicial de datos
  useEffect(() => {
    
    fetch('/api/users').then(r => r.json()).then(setUsers);
  }, []);

  // WS
  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:4000');

    ws.current.onopen = () => console.log('WS conectado');
    ws.current.onclose = () => console.log('WS desconectado');
    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        
         if (msg.type === 'new_user') setUsers(prev => [...prev, msg.data]);
      // eslint-disable-next-line no-empty
      } catch {}
    };

    return () => ws.current.close();
  }, []);

  // Añadir item
  

  // Añadir user
  const addUser = () => {
    const { username, email } = inputUser;
    if (!username.trim() || !email.trim()) return;
    fetch('/api/users', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({username: username.trim(), email: email.trim()})
    }).then(r => r.json()).then(() => setInputUser({ username: '', email: '' }));
  };

  return (
    <div>
      <h1>React + Express + SQLite + WebSocket con varias tablas</h1>

     

      <section>
        <h2>Users</h2>
        <ul>{users.map(u => <li key={u.id}>{u.username} ({u.email})</li>)}</ul>
        <input 
          placeholder="Username"
          value={inputUser.username}
          onChange={e => setInputUser({...inputUser, username: e.target.value})}
        />
        <input 
          placeholder="Email"
          value={inputUser.email}
          onChange={e => setInputUser({...inputUser, email: e.target.value})}
        />
        <button onClick={addUser}>Agregar User</button>
      </section>
    </div>
  );
}

export default App;
