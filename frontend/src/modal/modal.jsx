import React from "react";
import "./modal.css";

export function Modal({ children }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}
