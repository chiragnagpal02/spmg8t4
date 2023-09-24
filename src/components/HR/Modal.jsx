import React from 'react';

const Modal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Are you sure you want to delete this product?</h3>
                <button onClick={onConfirm}>Yes, I'm sure</button>
                <button onClick={onClose}>No, cancel</button>
            </div>
        </div>
    );
};

export default Modal;