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
  const [currentInstruction, setCurrentInstruction] = React.useState<string>("");
  const [solutionSteps, setSolutionSteps] = React.useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const [isGuiding, setIsGuiding] = React.useState<boolean>(false);

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
      if (row !== currentStep.movement[0] || col !== currentStep.movement[1]) {
        return;
      }
  
      // Realizar el movimiento
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
      }
    } else {
      // Movimiento normal fuera del modo guiado
      const newBoard = mainBoard.map(row => [...row]);
      [newBoard[emptyCell.row][emptyCell.col], newBoard[row][col]] = 
      [newBoard[row][col], newBoard[emptyCell.row][emptyCell.col]];
      
      setMainBoard(newBoard);
    }
  };

  // Función para encontrar la celda vacía en un tablero específico
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

// Función para verificar si un movimiento es válido en un tablero específico
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

  const generateNewBoards = () => {
    setSolution([]);
    setCurrentStep(0);
    setIsSolving(false);
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

  const testSpecificCase = () => {
    // Definir el tablero de prueba específico
    const testMainBoard = [
      ['V', 'Z', 'N', 'V', 'Z'],
      ['R', 'B', 'Z', 'R', 'R'],
      ['B', 'R', '*', 'B', 'N'],
      ['A', 'A', 'V', 'V', 'Z'],
      ['N', 'A', 'A', 'B', 'N']
    ];
  
    const testMiniBoard = [
      ['N', 'B', 'R'],
      ['A', 'A', 'V'],
      ['A', 'Z', 'Z']
    ];
  
    // Mapeo de letras a colores usando tus COLORS existentes
    const letterToColor = {
      'N': COLORS.BLUED,    // '#3b21e4'
      'B': COLORS.BLUE,     // '#3291d1'
      'R': COLORS.YELLOW,   // '#ffd000'
      'V': COLORS.GREEN,    // '#2db48e'
      'Z': COLORS.CLARITO,  // '#8c8cd4'
      'A': COLORS.PURPLE,   // '#8a1aee'
      '*': COLORS.GRAY      // '#000000'
    } as const;
  
    console.log('Tablero de prueba principal:', testMainBoard);
    console.log('Tablero de prueba objetivo:', testMiniBoard);
  
    // Convertir los tableros de letras a colores
    const colorMainBoard = testMainBoard.map(row =>
      row.map((letter) => letterToColor[letter as keyof typeof letterToColor])
    );
  
    const colorMiniBoard = testMiniBoard.map(row =>
      row.map((letter) => letterToColor[letter as keyof typeof letterToColor])
    );
  
    console.log('Tablero principal convertido:', colorMainBoard);
    console.log('Tablero objetivo convertido:', colorMiniBoard);
  
    // Establecer los tableros
    setMainBoard(colorMainBoard);
    setMiniBoard(colorMiniBoard);
  
    // Resetear estados
    setSolution([]);
    setCurrentStep(0);
    setCurrentInstruction("");
    setIsSolving(false);
  };
  
  const resetGuide = () => {
    setIsGuiding(false);
    setCurrentStepIndex(0);
    setCurrentInstruction("");
  };

  const runAutomatedTest = async () => {
    try {
      console.log('Iniciando test automatizado...');
      // Cargar el caso de prueba
      testSpecificCase();
      
      // Esperar un momento para asegurar que los estados se actualizaron
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Enviando tableros al backend:', {
        mainBoard,
        targetBoard: miniBoard
      });
  
      // Intentar resolver
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
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en la respuesta: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Respuesta del backend:', data);
      
      if (data.success) {
        console.log('Test exitoso:');
        console.log(`- Solución encontrada en ${data.steps} pasos`);
        console.log(`- Tiempo: ${data.time} segundos`);
        setSolution(data.solution);
        setCurrentStep(0);
        if (data.solution[0]?.direction) {
          setCurrentInstruction(data.solution[0].direction);
        }
        alert(`Test exitoso:\nSolución encontrada en ${data.steps} pasos\nTiempo: ${data.time} segundos`);
      } else {
        console.error('Test fallido:', data.message);
        alert(`Test fallido: ${data.message}`);
      }
      
    } catch (error) {
      console.error('Error en el test:', error);
      if (error instanceof Error) {
        alert(`Error al ejecutar el test: ${error.message}`);
      } else {
        alert('Error al ejecutar el test');
      }
    }
  };

  React.useEffect(() => {
    generateNewBoards();
  }, []);

  return (
    <div className="flex w-full h-[calc(100vh-64px)]"> 
    {/* Columna izquierda - Tableros */}
    <div className="w-1/2 flex flex-col items-center justify-center gap-8 p-8 bg-black">
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

    {/* Columna derecha - Botones */}
    <div className="w-1/2 flex flex-col items-center justify-center gap-4 p-8 bg-black">

      {/* Mostrar instrucciones si estamos en modo guiado */}
      {isGuiding && (
            <div className="text-white text-center mb-4 p-4 bg-gray-800 rounded">
              <p className="text-lg font-bold mb-2">
                Paso {currentStepIndex + 1} de {solutionSteps.length}
              </p>
              <div className="text-xl bg-gray-700 p-3 rounded">
                {currentInstruction || "Esperando siguiente movimiento..."}
              </div>
            </div>
          )}
      <button 
        onClick={testBackend}
        className="w-64 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
      >
        Probar Conexión
      </button>

      <button 
        onClick={generateNewBoards}
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

      {/* Nuevo botón de test automatizado */}
      <button 
        onClick={runAutomatedTest}
        className="w-64 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Ejecutar Test Automatizado
      </button> 

    </div>
  </div>
);
};

export default GameBoard;