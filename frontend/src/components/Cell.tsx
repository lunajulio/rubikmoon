
'use client';
import React from 'react';

interface CellProps {
  color: string;
  size?: 'tiny' | 'small' | 'normal';
  onClick?: () => void;
}

const Cell: React.FC<CellProps> = ({ color, size = 'normal', onClick }) => {
  const cellSize = 
                  size === 'tiny' ? 'w-4 h-4' :    // 16px x 16px
                  size === 'small' ? 'w-8 h-8' :   // 32px x 32px
                  'w-16 h-16';  
  
  return (
    <div 
      className={`${cellSize} border-2 border-gray-800 rounded-sm cursor-pointer transition-all duration-200 hover:opacity-80`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
};

export default Cell;