'use client';

import React from 'react';
import Cell from './Cell';

const COLORS = {
  RED: '#FF0000',
  GREEN: '#00FF00',
  BLUE: '#0000FF',
  YELLOW: '#FFFF00',
  WHITE: '#FFFFFF',
  ORANGE: '#FFA500',
  GRAY: '#808080'  // Casilla vacía
};

const GameBoard = () => {
  const [mainBoard, setMainBoard] = React.useState<string[][]>([]);
  const [miniBoard, setMiniBoard] = React.useState<string[][]>([]);

  // Encuentra la posición de la casilla vacía
  const findEmptyCell = () => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (mainBoard[i][j] === COLORS.GRAY) {
          return { row: i, col: j };
        }
      }
    }
    return { row: -1, col: -1 };
  };

  // Verifica si un movimiento es válido
  const isValidMove = (row: number, col: number) => {
    const emptyCell = findEmptyCell();
    
    // Verifica si la celda está adyacente a la casilla vacía
    return (
      // Movimiento arriba (1)
      (row === emptyCell.row + 1 && col === emptyCell.col) ||
      // Movimiento abajo (2)
      (row === emptyCell.row - 1 && col === emptyCell.col) ||
      // Movimiento izquierda (3)
      (row === emptyCell.row && col === emptyCell.col + 1) ||
      // Movimiento derecha (4)
      (row === emptyCell.row && col === emptyCell.col - 1)
    );
  };

  // Maneja el movimiento de una ficha
  const handleMove = (row: number, col: number) => {
    if (!isValidMove(row, col)) return;

    const newBoard = mainBoard.map(row => [...row]);
    const emptyCell = findEmptyCell();

    // Intercambia la ficha seleccionada con la casilla vacía
    [newBoard[row][col], newBoard[emptyCell.row][emptyCell.col]] = 
    [newBoard[emptyCell.row][emptyCell.col], newBoard[row][col]];

    setMainBoard(newBoard);
  };

  // Genera tableros aleatorios
  const generateNewBoards = () => {
    // Genera el mini tablero (objetivo) 3x2
    const newMiniBoard = Array(3).fill(null).map(() => 
      Array(3).fill(null).map(() => {
        const colors = Object.values(COLORS).filter(c => c !== COLORS.GRAY);
        return colors[Math.floor(Math.random() * colors.length)];
      })
    );
    setMiniBoard(newMiniBoard);

    // Genera el tablero principal 5x5
    const newMainBoard = Array(5).fill(null).map(() => 
      Array(5).fill(null).map(() => {
        const colors = Object.values(COLORS).filter(c => c !== COLORS.GRAY);
        return colors[Math.floor(Math.random() * colors.length)];
      })
    );
    // Coloca la casilla vacía en una posición aleatoria
    const randomRow = Math.floor(Math.random() * 5);
    const randomCol = Math.floor(Math.random() * 5);
    newMainBoard[randomRow][randomCol] = COLORS.GRAY;
    setMainBoard(newMainBoard);
  };

  React.useEffect(() => {
    generateNewBoards();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <button 
        onClick={generateNewBoards}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Generar Nuevos Tableros
      </button>

      {/* Mini tablero (objetivo) */}
      <div className="grid grid-cols-3 gap-1">
        {miniBoard.map((row, i) =>
          row.map((color, j) => (
            <Cell key={`mini-${i}-${j}`} color={color} size="small" />
          ))
        )}
      </div>

      {/* Tablero principal */}
      <div className="p-4 bg-gray-700 rounded-lg">
        <div className="grid grid-cols-5 gap-1">
          {mainBoard.map((row, i) =>
            row.map((color, j) => (
              <Cell 
                key={`main-${i}-${j}`} 
                color={color}
                onClick={() => handleMove(i, j)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;