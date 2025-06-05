import React, { useEffect, useState, useRef } from 'react';

function App() {
 
  const [users, setUsers] = useState([]);
  
  const [inputUser, setInputUser] = useState({ username: '', email: '',contrasena:'',avatar:'' });
  const ws = useRef(null);

  // Carga inicial de datos
  useEffect(() => {
    
    fetch('/api/usuarios').then(r => r.json()).then(setUsers);
  }, []);

  // WS
  useEffect(() => {
    ws.current = new WebSocket('ws://127.0.0.1:4000');

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

  
  

  // Añadir user
  const addUser = () => {
    console.log("fff")
    const { username, email,contrasena,avatar } = inputUser;
    if (!username.trim() || !email.trim()) return;
    fetch('/api/usuarios', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({nombre: username.trim(), email: email.trim(),contrasena: contrasena.trim(),avatar:avatar.trim()})
    }).then(r => r.json()).then(() => setInputUser({ username: '', email: '',contrasena:'',avatar:'' }));
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
        
        <input 
          placeholder="Contraseña"
          value={inputUser.contrasena}
          onChange={e => setInputUser({...inputUser, contrasena: e.target.value})}
        />
        
        <input 
          placeholder="avatar"
          value={inputUser.avatar}
          onChange={e => setInputUser({...inputUser, avatar: e.target.value})}
        />
        
        <button onClick={addUser}>Agregar User</button>
      </section>
    </div>
  );
}

export default App;
