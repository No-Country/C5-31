import React from "react";
import logo from "../assets/images/logo.png";
import "@styles/modal.css";

const Modal = ({children }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div style={{display: 'flex'}}><img className="logoWarningModal" src={logo} alt="" /></div>
                <div className="modal-content__body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
