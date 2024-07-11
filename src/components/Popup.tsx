// Popup.tsx
import React from 'react';

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Refer Now</h2>
        <p className="mb-4">Share this link to refer your friends and earn rewards!</p>
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default Popup;
