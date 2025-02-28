'use client';

import React, { useState, useRef } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import SolutionModal from './SolutionModal';

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
  const [mainBoard, setMainBoard] = useState<string[][]>([]);
  const [miniBoard, setMiniBoard] = useState<string[][]>([]);
  const [solution, setSolution] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState<string>("");
  const [solutionSteps, setSolutionSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isGuiding, setIsGuiding] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [boardHistory, setBoardHistory] = useState<string[][][]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentBoardIndex, setCurrentBoardIndex] = useState<number>(0);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [solutionData, setSolutionData] = useState({ steps: 0, time: '0.00' });
  const [isPuzzleCompleted, setIsPuzzleCompleted] = useState<boolean>(false);
  const [shakingCell, setShakingCell] = useState<{ row: number; col: number } | null>(null);

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

  const checkIfPuzzleCompleted = () => {
    for (let i = 0; i < miniBoard.length; i++) {
      for (let j = 0; j < miniBoard[i].length; j++) {
        if (mainBoard[i][j] !== miniBoard[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const handleMove = (row: number, col: number) => {
    // No permitir movimientos si el puzzle está completado
    if (isPuzzleCompleted) {
      return;
    }
  
    const emptyCell = findEmptyCell();
  
    // Verificar si el movimiento es válido
    if (!isValidMove(row, col)) {

      setShakingCell({ row, col });
      setTimeout(() => {
        setShakingCell(null);
      }, 500);
      return;
    }
  
    // Si estamos en modo guiado
    if (isGuiding && currentStepIndex < solutionSteps.length) {
      const currentStep = solutionSteps[currentStepIndex];
      const [expectedRow, expectedCol] = currentStep.movement;
  
      // Verificar si es el movimiento esperado
      if (row !== expectedRow || col !== expectedCol) {
        setShakingCell({ row, col });
        setTimeout(() => {
          setShakingCell(null);
        }, 500);
        return;
      }
  
      const newBoard = mainBoard.map((row) => [...row]);
      [newBoard[emptyCell.row][emptyCell.col], newBoard[row][col]] = [
        newBoard[row][col],
        newBoard[emptyCell.row][emptyCell.col],
      ];
  
      setMainBoard(newBoard);
  
      if (boardHistory.length === 0) {
        setBoardHistory([mainBoard]);
      }
  
      setBoardHistory((prevHistory) => {
        const lastBoard = prevHistory[prevHistory.length - 1];
        if (JSON.stringify(lastBoard) !== JSON.stringify(newBoard)) {
          const updatedHistory = [...prevHistory, newBoard];
          setCurrentBoardIndex(updatedHistory.length - 1);
          return updatedHistory;
        }
        return prevHistory;
      });
  
      // Avanzar al siguiente paso
      if (currentStepIndex < solutionSteps.length - 1) {
        const nextIndex = currentStepIndex + 1;
        setCurrentStepIndex(nextIndex);
  
        // Establecer la instrucción del siguiente movimiento
        if (solutionSteps[nextIndex]?.direction) {
          setCurrentInstruction(solutionSteps[nextIndex].direction);
        } else {
          setCurrentInstruction("Siguiente movimiento");
        }
      } else {
        setIsGuiding(false);
        setCurrentInstruction("¡Puzzle completado!");
        setIsModalOpen(true);
        setIsPuzzleCompleted(true); // Marcar el puzzle como completado
      }
    } else {
      // Movimiento normal fuera del modo guiado
      const newBoard = mainBoard.map((row) => [...row]);
      [newBoard[emptyCell.row][emptyCell.col], newBoard[row][col]] = [
        newBoard[row][col],
        newBoard[emptyCell.row][emptyCell.col],
      ];
  
      setMainBoard(newBoard);
  
      setBoardHistory((prevHistory) => {
        const lastBoard = prevHistory[prevHistory.length - 1];
        if (JSON.stringify(lastBoard) !== JSON.stringify(newBoard)) {
          const updatedHistory = [...prevHistory, newBoard];
          setCurrentBoardIndex(updatedHistory.length - 1);
          return updatedHistory;
        }
        return prevHistory;
      });
  
      // Verificar si el puzzle está completado
      if (checkIfPuzzleCompleted()) {
        setIsPuzzleCompleted(true);
        setCurrentInstruction("¡Puzzle completado!");
        setIsModalOpen(true);
      }
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
    // Verificar si steps es null o undefined
    if (!steps || !Array.isArray(steps)) {
      console.error("La solución no es válida o está vacía");
      return false;
    }
  
    let currentBoard = mainBoard.map(row => [...row]);
  
    for (const step of steps) {
      const [targetRow, targetCol] = step.movement;
  
      // Ignorar el movimiento si es el valor por defecto (-1, -1)
      if (targetRow === -1 && targetCol === -1) {
        continue; // Saltar este paso y continuar con el siguiente
      }
  
      const emptyCell = findEmptyCellInBoard(currentBoard);
  
      // Verificar si el movimiento es válido
      if (!isValidMoveForBoard(targetRow, targetCol, currentBoard)) {
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
    return rows.slice(0, size).map(row => row.slice(0, size).split('').map(char => {
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
    setIsPuzzleCompleted(false); // Reiniciar el estado del puzzle completado
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
          targetBoard: miniBoard,
        }),
      });
  
      const data = await response.json();
      console.log('Solución recibida:', data);
  
      if (data.success && Array.isArray(data.solution) && data.solution.length > 0) {
        // Validar que cada paso de la solución es válido
        if (validateSolution(data.solution)) {
          setSolutionSteps(data.solution);
  
          // Comenzar el modo guiado desde el segundo movimiento (índice 1)
          setCurrentStepIndex(1); // Ignorar el primer movimiento (-1, -1)
          setIsGuiding(true);
  
          // Establecer la instrucción del segundo movimiento
          if (data.solution[1]?.direction) {
            setCurrentInstruction(data.solution[1].direction);
          } else {
            setCurrentInstruction("Movimiento inicial");
          }
  
          setSolutionData({
            steps: data.steps,
            time: data.time,
          });
          setIsSolutionModalOpen(true);
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

  const scrollLeft = () => {
    if (currentBoardIndex > 0) {
      setCurrentBoardIndex(prev => prev - 1);
      if (sliderRef.current) {
        sliderRef.current.scrollLeft -= 200;
      }
    }
  };
  
  const scrollRight = () => {
    if (currentBoardIndex < boardHistory.length - 1) {
      setCurrentBoardIndex(prev => prev + 1);
      if (sliderRef.current) {
        sliderRef.current.scrollLeft += 200;
      }
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
    <div className="flex flex-col h-full">
      <div className="flex flex-1">
        {/* Columna izquierda - Tableros */}
        <div className="w-2/3 flex flex-col items-center justify-center gap-8 p-8 bg-black">
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
                    isShaking={shakingCell?.row === i && shakingCell?.col === j}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha - Botones */}
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
      </div>

      {/* Slider de historial - En la parte inferior */}
      {boardHistory.length >= 2 && (
        <div className="w-full px-8 pb-8">
          <div className="w-full flex items-center justify-center gap-4 p-4 rounded-lg">
            <button 
              onClick={scrollLeft}
              disabled={currentBoardIndex === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              ←
            </button>

            <div 
              ref={sliderRef} 
              className="flex overflow-x-auto transition-all duration-300 ease-in-out"
              style={{
                maxWidth: '800px',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {boardHistory.map((board, index) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 p-2 transition-all duration-200 ${
                    currentBoardIndex === index ? 'border-2 border-blue-500' : ''
                  }`}
                >
                  <div className="grid grid-cols-5 gap-0.3">
                    {board.map((row, i) =>
                      row.map((color, j) => (
                        <Cell 
                          key={`history-${index}-${i}-${j}`} 
                          color={color}
                          size="tiny"
                        />
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={scrollRight}
              disabled={currentBoardIndex === boardHistory.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPlayAgain={handlePlayAgain} 
      />

      <SolutionModal
        isOpen={isSolutionModalOpen}
        onClose={() => setIsSolutionModalOpen(false)}
        steps={solutionData.steps}
        time={parseFloat(solutionData.time)}
      />
    </div>
  );
};

export default GameBoard;