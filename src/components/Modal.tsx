import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onPlayAgain }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">¡Puzzle completado!</h2>
        <p className="mb-8 text-black">¡Felicidades! Has completado el puzzle.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Aceptar
          </button>
          <button
            onClick={onPlayAgain}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;