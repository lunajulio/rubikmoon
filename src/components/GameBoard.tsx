'use client';

import React from 'react';
import Cell from './Cell';
import Modal from './Modal';

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
  const [currentInstruction, setCurrentInstruction] = React.useState<string>("");
  const [solutionSteps, setSolutionSteps] = React.useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const [isGuiding, setIsGuiding] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [boardHistory, setBoardHistory] = React.useState<string[][][]>([]);

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
    const emptyCell = findEmptyCell();
    
    // Verificar si el movimiento es válido
    if (!isValidMove(row, col)) {
      console.log("Movimiento no válido: la ficha debe estar junto al espacio vacío");
      return;
    }
  
    // Si estamos en modo guiado
    if (isGuiding && currentStepIndex < solutionSteps.length) {
      const currentStep = solutionSteps[currentStepIndex];
      const [expectedRow, expectedCol] = currentStep.movement;
      
      // Verificar si es el movimiento esperado
      if (row !== expectedRow || col !== expectedCol) {
        console.log("Movimiento no esperado en modo guiado");
        return;
      }
  
      // Realizar el movimiento
          // Guardar el estado actual del tablero en el historial
      setBoardHistory(prevHistory => [...prevHistory, mainBoard.map(row => [...row])]);
      const newBoard = mainBoard.map(row => [...row]);
      [newBoard[emptyCell.row][emptyCell.col], newBoard[row][col]] = 
      [newBoard[row][col], newBoard[emptyCell.row][emptyCell.col]];
      
      setMainBoard(newBoard);
  
      // Avanzar al siguiente paso
      if (currentStepIndex < solutionSteps.length - 1) {
        const nextIndex = currentStepIndex + 1;
        setCurrentStepIndex(nextIndex);
        setCurrentInstruction(solutionSteps[nextIndex].direction);
      } else {
        setIsGuiding(false);
        setCurrentInstruction("¡Puzzle completado!");
        setIsModalOpen(true);
      }
    } else {
      // Movimiento normal fuera del modo guiado
      const newBoard = mainBoard.map(row => [...row]);
      [newBoard[emptyCell.row][emptyCell.col], newBoard[row][col]] = 
      [newBoard[row][col], newBoard[emptyCell.row][emptyCell.col]];
      
      setMainBoard(newBoard);
    }

  };

  const findEmptyCellInBoard = (board: string[][]) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === COLORS.GRAY) {
          return { row: i, col: j };
        }
      }
    }
    return { row: -1, col: -1 };
  };

  const isValidMoveForBoard = (row: number, col: number, board: string[][]) => {
    const emptyCell = findEmptyCellInBoard(board);
    return (
      (row === emptyCell.row + 1 && col === emptyCell.col) ||
      (row === emptyCell.row - 1 && col === emptyCell.col) ||
      (row === emptyCell.row && col === emptyCell.col + 1) ||
      (row === emptyCell.row && col === emptyCell.col - 1)
    );
  };

  const validateSolution = (steps: any[]) => {
    let currentBoard = mainBoard.map(row => [...row]);
    
    for (const step of steps) {
      const emptyCell = findEmptyCellInBoard(currentBoard);
      const [targetRow, targetCol] = step.movement;
      
      // Verificar si el movimiento es válido
      if (!isValidMoveForBoard(targetRow, targetCol, currentBoard)) {
        console.error("Solución inválida: movimiento no permitido");
        return false;
      }
      
      // Actualizar el tablero
      const newBoard = currentBoard.map(row => [...row]);
      [newBoard[emptyCell.row][emptyCell.col], newBoard[targetRow][targetCol]] = 
      [newBoard[targetRow][targetCol], newBoard[emptyCell.row][emptyCell.col]];
      currentBoard = newBoard;
    }
    
    return true;
  };

  const parseBoard = (boardString: string, size: number) => {
    const rows = boardString.split(',');
    return rows.map(row => row.split('').map(char => {
      switch (char) {
        case 'Y': return COLORS.YELLOW;
        case 'G': return COLORS.GREEN;
        case 'B': return COLORS.BLUE;
        case 'D': return COLORS.BLUED;
        case 'P': return COLORS.PURPLE;
        case 'C': return COLORS.CLARITO;
        case '*': return COLORS.GRAY;
        default: return COLORS.GRAY;
      }
    }));
  };

  const loadBoardsFromFile = async () => {
    setSolution([]);
    setCurrentStep(0);
    setIsSolving(false);
    setBoardHistory([]);
    const response = await fetch('/test-cases.txt');
    const fileContent = await response.text();
    const cases = fileContent.split('\n').filter(line => line.trim() !== '');
    const randomCase = cases[Math.floor(Math.random() * cases.length)];
    const [mainBoardString, miniBoardString] = randomCase.split('|');

    const newMainBoard = parseBoard(mainBoardString, 5);
    const newMiniBoard = parseBoard(miniBoardString, 3);

    setMainBoard(newMainBoard);
    setMiniBoard(newMiniBoard);
  };

  const solvePuzzle = async () => {
    try {
      setIsSolving(true);
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
      console.log('Solución recibida:', data);
  
      if (data.success && data.solution && data.solution.length > 0) {
        // Validar que cada paso de la solución es válido
        if (validateSolution(data.solution)) {
          setSolutionSteps(data.solution);
          setCurrentStepIndex(0);
          setIsGuiding(true);
          setCurrentInstruction(data.solution[0].direction);
      
          alert(`¡Solución encontrada!\nNúmero de pasos: ${data.solution.length}\nTiempo: ${data.time} segundos`);
        } else {
          alert('La solución recibida contiene movimientos inválidos');
        }
      } else {
        alert('No se encontró solución');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al buscar solución');
    } finally {
      setIsSolving(false);
    }
  };

  const resetGuide = () => {
    setIsGuiding(false);
    setCurrentStepIndex(0);
    setCurrentInstruction("");
  };

  const handlePlayAgain = () => {
    setIsModalOpen(false);
    resetGuide();
    setBoardHistory([]);
    loadBoardsFromFile();

  };

  React.useEffect(() => {
    loadBoardsFromFile();
  }, []);

  return (
    <div className="flex w-full h-[calc(100vh-64px)]">
      {/* Columna izquierda - Tableros */}
      <div className="w-1/3 flex flex-col items-center justify-center gap-8 p-8 bg-black">
        {/* Mini tablero (objetivo) */}
        <div className="grid grid-cols-3 gap-1">
          {miniBoard.map((row, i) =>
            row.map((color, j) => (
              <Cell key={`mini-${i}-${j}`} color={color} size="small" />
            ))
          )}
        </div>

        {/* Tablero principal */}
        <div className="p-4 bg-black rounded-lg">
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

      {/* Columna central - Botones */}
      <div className="w-1/3 flex flex-col items-center justify-center gap-4 p-8 bg-black">
        <button 
          onClick={loadBoardsFromFile}
          className="w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Generar Nuevos Tableros
        </button>

        <button 
          onClick={solvePuzzle}
          disabled={isSolving}
          className="w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isSolving ? 'Resolviendo...' : 'Resolver Puzzle'}
        </button>
      </div>

      {/* Columna derecha - Historial */}
      <div className="w-1/3 flex flex-col items-center justify-center gap-4 p-8 bg-black overflow-y-auto h-full">
        <h2 className="text-white text-xl mb-4">Historial de Tableros</h2>
        {boardHistory.map((board, index) => (
          <div key={index} className="mb-4">
            <div className="grid grid-cols-5 gap-1">
              {board.map((row, i) =>
                row.map((color, j) => (
                  <Cell key={`history-${index}-${i}-${j}`} color={color} size="small" />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPlayAgain={handlePlayAgain} 
      />
    </div>
  );
};

export default GameBoard;