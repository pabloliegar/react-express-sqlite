import React from 'react';

import {Navigation} from "./routes/navigation"
import {AuthProvider} from "./context/AuthContext"
function App() {
 
 /* const [users, setUsers] = useState([]);
  
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
  };*/

  return (
   <>
   <AuthProvider>
    <Navigation/>
      </AuthProvider>
    
    
   </>
  );
}

export default App;
