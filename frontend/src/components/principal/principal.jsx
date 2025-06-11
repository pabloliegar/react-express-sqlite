import React,{useEffect,useState} from "react";
import "./principal.css";
import { Login } from "../login/login";
import {Modal} from "@/modal/modal";
import {getToken } from "@/api/token";

export function Principal() {
   const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setShowLoginModal(true);
    }
  }, []);
return (
     <div className="principal">
      <h1>Principal</h1>
      <p>Bienvenido al sistema de gestión de usuarios.</p>

      {showLoginModal && (
        <Modal>
          <Login onSuccess={() => setShowLoginModal(false)} />
        </Modal>
      )}
    </div>
  );
}