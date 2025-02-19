'use client';

import React from 'react';
import Cell from './Cell';

const COLORS = {
  YELLOW: '#ffd000',
  GREEN: '#2db48e',
  BLUE: '#3291d1',
  BLUED: '#3b21e4',
  PURPLE: '#8a1aee',
  CLARITO: '#8c8cd4',
  GRAY: '#000000'  // Casilla vacía
};

const GameBoard = () => {
  const [mainBoard, setMainBoard] = React.useState<string[][]>([]);
  const [miniBoard, setMiniBoard] = React.useState<string[][]>([]);
  const [solution, setSolution] = React.useState<any[]>([]);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSolving, setIsSolving] = React.useState(false);

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

  const isValidMove = (row: number, col: number) => {
    const emptyCell = findEmptyCell();
    return (
      (row === emptyCell.row + 1 && col === emptyCell.col) ||
      (row === emptyCell.row - 1 && col === emptyCell.col) ||
      (row === emptyCell.row && col === emptyCell.col + 1) ||
      (row === emptyCell.row && col === emptyCell.col - 1)
    );
  };

  const handleMove = (row: number, col: number) => {
    if (!isValidMove(row, col)) return;

    const newBoard = mainBoard.map(row => [...row]);
    const emptyCell = findEmptyCell();

    [newBoard[row][col], newBoard[emptyCell.row][emptyCell.col]] = 
    [newBoard[emptyCell.row][emptyCell.col], newBoard[row][col]];

    setMainBoard(newBoard);
  };

  const generateNewBoards = () => {
    // Función auxiliar para contar colores en un tablero
    const countColor = (board: string[][], color: string): number => {
      return board.flat().filter(c => c === color).length;
    };

    // Genera el mini tablero (3x3) con máximo 4 casillas por color
    const generateMiniBoard = () => {
      const newBoard = Array(3).fill(null).map(() => Array(3).fill(null));
      const colors = Object.values(COLORS).filter(c => c !== COLORS.GRAY);
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let availableColors = colors.filter(color => 
            countColor(newBoard, color) < 4
          );
          
          if (availableColors.length === 0) {
            availableColors = colors;
          }
          
          newBoard[i][j] = availableColors[
            Math.floor(Math.random() * availableColors.length)
          ];
        }
      }
      return newBoard;
    };

    // Genera el tablero principal (5x5) con exactamente 4 casillas por color
    const generateMainBoard = () => {
      const colors = Object.values(COLORS).filter(c => c !== COLORS.GRAY);
      let colorPool: string[] = [];
      
      // Agregar exactamente 4 casillas de cada color
      colors.forEach(color => {
        colorPool = colorPool.concat(Array(4).fill(color));
      });
      
      // Agregar una casilla gris
      colorPool.push(COLORS.GRAY);
      
      // Mezclar el array
      for (let i = colorPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]];
      }
      
      // Crear el tablero 5x5
      const newBoard: string[][] = [];
      for (let i = 0; i < 5; i++) {
        const row: string[] = [];
        for (let j = 0; j < 5; j++) {
          row.push(colorPool[i * 5 + j]);
        }
        newBoard.push(row);
      }
      
      return newBoard;
    };

    const newMiniBoard = generateMiniBoard();
    const newMainBoard = generateMainBoard();

    setMiniBoard(newMiniBoard);
    setMainBoard(newMainBoard);
  };


  const solvePuzzle = async () => {
    try {
      setIsSolving(true);
      console.log('Iniciando solicitud al backend...');
      
      const response = await fetch('http://localhost:8000/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mainBoard,
          targetBoard: miniBoard
        })
      });
  
      const data = await response.json();
      console.log('Datos recibidos:', data);
      
      if (data.success) {
        setSolution(data.solution);
        setCurrentStep(0);
        alert(`¡Solución encontrada! ${data.steps} pasos`);
      } else {
        alert('No se encontró solución');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error al comunicarse con el backend');
    } finally {
      setIsSolving(false);
    }
  };

  const showNextStep = () => {
    if (currentStep < solution.length - 1) {
      setCurrentStep(currentStep + 1);
      setMainBoard(solution[currentStep + 1].board);
    }
  };

  const testBackend = async () => {
    try {
      console.log('Probando conexión con backend...');
      const response = await fetch('http://localhost:8000/test');
      const data = await response.json();
      console.log('Respuesta de prueba:', data);
      alert('Conexión exitosa con el backend!');
    } catch (error) {
      console.error('Error en prueba:', error);
      alert('Error al conectar con el backend');
    }
  };

  React.useEffect(() => {
    generateNewBoards();
  }, []);


  return (
    <div className="flex flex-col items-center gap-8">

      <button 
        onClick={testBackend}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
      >
        Probar Conexión
      </button>

      <button 
      onClick={solvePuzzle}
      disabled={isSolving}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
      {isSolving ? 'Resolviendo...' : 'Resolver Puzzle'}
      </button>

            {/* Botones de solución */}
            {solution && solution.length > 0 && (
        <div className="flex gap-4 items-center">
          <button 
            onClick={showNextStep}
            disabled={currentStep >= solution.length - 1}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Siguiente Paso
          </button>
          <span>Paso {currentStep + 1} de {solution.length}</span>
        </div>
      )}

        
      <button 
        onClick={generateNewBoards}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Generar Nuevos Tableros
      </button>


      
      {/* Mini tablero (objetivo) */}
      <div   className="grid grid-cols-3 gap-1">
        {miniBoard.map((row, i) =>
          row.map((color, j) => (
            <Cell key={`mini-${i}-${j}`} color={color} size="small" />
          ))
        )}
      </div>

      {/* Tablero principal */}
      <div className="p-4 bg-black-800 rounded-lg">
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