import React,{useEffect,useState} from "react";
import "./principal.css";
import { Login } from "../login/login";
import {Modal} from "@/modal/modal";
import {getToken } from "@/api/token";
import {Chatg} from "@/components/chatg/chatg";
import { useAuth } from "@/hooks/useAuth";
export function Principal() {
   const [showLoginModal, setShowLoginModal] = useState(false);
      const { auth } = useAuth();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setShowLoginModal(true);
    }
  }, []);
return (
  <>
     <div className="principal">
      
      <Chatg />

      {showLoginModal && (
        <Modal>
          <Login onSuccess={() => setShowLoginModal(false)} />
        </Modal>
      )}
    </div>
    </>
  );
}