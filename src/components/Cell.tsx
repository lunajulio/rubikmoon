
'use client';

interface CellProps {
  color: string;
  size?: 'small' | 'normal';
  onClick?: () => void;
}

const Cell: React.FC<CellProps> = ({ color, size = 'normal', onClick }) => {
  const cellSize = size === 'small' ? 'w-8 h-8' : 'w-16 h-16';
  
  return (
    <div 
      className={`${cellSize} border-2 border-gray-800 rounded-sm cursor-pointer transition-all duration-200 hover:opacity-80`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
};

export default Cell;