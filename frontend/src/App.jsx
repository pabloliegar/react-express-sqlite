import React from 'react';

import {Navigation} from "./routes/navigation"
import {AuthProvider} from "./context/AuthContext"
function App() {


  return (
   <>
   <AuthProvider>
    <Navigation/>
      </AuthProvider>
    
    
   </>
  );
}

export default App;
