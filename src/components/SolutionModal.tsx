// components/SolutionModal.tsx
import React from 'react';

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: number;
  time: number;
}

const SolutionModal: React.FC<SolutionModalProps> = ({ isOpen, onClose, steps, time }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">¡Solución encontrada!</h2>
        
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg font-semibold text-black">
              Número de pasos: <span className="text-blue-600">{steps}</span>
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg font-semibold text-black">
              Tiempo: <span className="text-blue-600">{time}</span> segundos
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionModal;