module.exports = {

"[project]/src/components/GameBoard.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
const GameBoard = ()=>{
    const [mainBoard, setMainBoard] = useState([]);
    const [miniBoard, setMiniBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSolving, setIsSolving] = useState(false);
    const [currentInstruction, setCurrentInstruction] = useState("");
    const [solutionSteps, setSolutionSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isGuiding, setIsGuiding] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boardHistory, setBoardHistory] = useState([]);
    const sliderRef = useRef(null);
    const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
    const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
    const [solutionData, setSolutionData] = useState({
        steps: 0,
        time: '0.00'
    });
    const [isPuzzleCompleted, setIsPuzzleCompleted] = useState(false);
    const findEmptyCell = ()=>{
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if (mainBoard[i][j] === COLORS.GRAY) {
                    return {
                        row: i,
                        col: j
                    };
                }
            }
        }
        return {
            row: -1,
            col: -1
        };
    };
    const isValidMove = (row, col)=>{
        const emptyCell = findEmptyCell();
        return row === emptyCell.row + 1 && col === emptyCell.col || row === emptyCell.row - 1 && col === emptyCell.col || row === emptyCell.row && col === emptyCell.col + 1 || row === emptyCell.row && col === emptyCell.col - 1;
    };
    const checkIfPuzzleCompleted = ()=>{
        for(let i = 0; i < miniBoard.length; i++){
            for(let j = 0; j < miniBoard[i].length; j++){
                if (mainBoard[i][j] !== miniBoard[i][j]) {
                    return false;
                }
            }
        }
        return true;
    };
    const handleMove = (row, col)=>{
        // No permitir movimientos si el puzzle está completado
        if (isPuzzleCompleted) {
            return;
        }
        const emptyCell = findEmptyCell();
        // Verificar si el movimiento es válido
        if (!isValidMove(row, col)) {
            return;
        }
        // Si estamos en modo guiado
        if (isGuiding && currentStepIndex < solutionSteps.length) {
            const currentStep = solutionSteps[currentStepIndex];
            const [expectedRow, expectedCol] = currentStep.movement;
            // Verificar si es el movimiento esperado
            if (row !== expectedRow || col !== expectedCol) {
                return;
            }
            const newBoard = mainBoard.map((row)=>[
                    ...row
                ]);
            [newBoard[emptyCell.row][emptyCell.col], newBoard[row][col]] = [
                newBoard[row][col],
                newBoard[emptyCell.row][emptyCell.col]
            ];
            setMainBoard(newBoard);
            if (boardHistory.length === 0) {
                setBoardHistory([
                    mainBoard
                ]);
            }
            setBoardHistory((prevHistory)=>{
                const lastBoard = prevHistory[prevHistory.length - 1];
                if (JSON.stringify(lastBoard) !== JSON.stringify(newBoard)) {
                    const updatedHistory = [
                        ...prevHistory,
                        newBoard
                    ];
                    setCurrentBoardIndex(updatedHistory.length - 1);
                    return updatedHistory;
                }
                return prevHistory;
            });
            // Avanzar al siguiente paso
            if (currentStepIndex < solutionSteps.length - 1) {
                const nextIndex = currentStepIndex + 1;
                setCurrentStepIndex(nextIndex);
                setCurrentInstruction(solutionSteps[nextIndex].direction);
            } else {
                setIsGuiding(false);
                setCurrentInstruction("¡Puzzle completado!");
                setIsModalOpen(true);
                setIsPuzzleCompleted(true); // Marcar el puzzle como completado
            }
        } else {
            // Movimiento normal fuera del modo guiado
            const newBoard = mainBoard.map((row)=>[
                    ...row
                ]);
            [newBoard[emptyCell.row][emptyCell.col], newBoard[row][col]] = [
                newBoard[row][col],
                newBoard[emptyCell.row][emptyCell.col]
            ];
            setMainBoard(newBoard);
            setBoardHistory((prevHistory)=>{
                const lastBoard = prevHistory[prevHistory.length - 1];
                if (JSON.stringify(lastBoard) !== JSON.stringify(newBoard)) {
                    const updatedHistory = [
                        ...prevHistory,
                        newBoard
                    ];
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
    const findEmptyCellInBoard = (board)=>{
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if (board[i][j] === COLORS.GRAY) {
                    return {
                        row: i,
                        col: j
                    };
                }
            }
        }
        return {
            row: -1,
            col: -1
        };
    };
    const isValidMoveForBoard = (row, col, board)=>{
        const emptyCell = findEmptyCellInBoard(board);
        return row === emptyCell.row + 1 && col === emptyCell.col || row === emptyCell.row - 1 && col === emptyCell.col || row === emptyCell.row && col === emptyCell.col + 1 || row === emptyCell.row && col === emptyCell.col - 1;
    };
    const validateSolution = (steps)=>{
        let currentBoard = mainBoard.map((row)=>[
                ...row
            ]);
        for (const step of steps){
            const emptyCell = findEmptyCellInBoard(currentBoard);
            const [targetRow, targetCol] = step.movement;
            // Verificar si el movimiento es válido
            if (!isValidMoveForBoard(targetRow, targetCol, currentBoard)) {
                return false;
            }
            // Actualizar el tablero
            const newBoard = currentBoard.map((row)=>[
                    ...row
                ]);
            [newBoard[emptyCell.row][emptyCell.col], newBoard[targetRow][targetCol]] = [
                newBoard[targetRow][targetCol],
                newBoard[emptyCell.row][emptyCell.col]
            ];
            currentBoard = newBoard;
        }
        return true;
    };
    const parseBoard = (boardString, size)=>{
        const rows = boardString.split(',');
        return rows.slice(0, size).map((row)=>row.slice(0, size).split('').map((char)=>{
                switch(char){
                    case 'Y':
                        return COLORS.YELLOW;
                    case 'G':
                        return COLORS.GREEN;
                    case 'B':
                        return COLORS.BLUE;
                    case 'D':
                        return COLORS.BLUED;
                    case 'P':
                        return COLORS.PURPLE;
                    case 'C':
                        return COLORS.CLARITO;
                    case '*':
                        return COLORS.GRAY;
                    default:
                        return COLORS.GRAY;
                }
            }));
    };
    const loadBoardsFromFile = async ()=>{
        setSolution([]);
        setCurrentStep(0);
        setIsSolving(false);
        setBoardHistory([]);
        setIsPuzzleCompleted(false); // Reiniciar el estado del puzzle completado
        const response = await fetch('/test-cases.txt');
        const fileContent = await response.text();
        const cases = fileContent.split('\n').filter((line)=>line.trim() !== '');
        const randomCase = cases[Math.floor(Math.random() * cases.length)];
        const [mainBoardString, miniBoardString] = randomCase.split('|');
        const newMainBoard = parseBoard(mainBoardString, 5);
        const newMiniBoard = parseBoard(miniBoardString, 3);
        setMainBoard(newMainBoard);
        setMiniBoard(newMiniBoard);
    };
    const solvePuzzle = async ()=>{
        try {
            setIsSolving(true);
            const response = await fetch('http://localhost:8000/api/solve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                    setSolutionData({
                        steps: data.steps,
                        time: data.time
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
        } finally{
            setIsSolving(false);
        }
    };
    const scrollLeft = ()=>{
        if (currentBoardIndex > 0) {
            setCurrentBoardIndex((prev)=>prev - 1);
            if (sliderRef.current) {
                sliderRef.current.scrollLeft -= 200;
            }
        }
    };
    const scrollRight = ()=>{
        if (currentBoardIndex < boardHistory.length - 1) {
            setCurrentBoardIndex((prev)=>prev + 1);
            if (sliderRef.current) {
                sliderRef.current.scrollLeft += 200;
            }
        }
    };
    const resetGuide = ()=>{
        setIsGuiding(false);
        setCurrentStepIndex(0);
        setCurrentInstruction("");
    };
    const handlePlayAgain = ()=>{
        setIsModalOpen(false);
        resetGuide();
        setBoardHistory([]);
        loadBoardsFromFile();
    };
    React.useEffect(()=>{
        loadBoardsFromFile();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2/3 flex flex-col items-center justify-center gap-8 p-8 bg-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-1",
                                children: miniBoard.map((row, i)=>row.map((color, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Cell, {
                                            color: color,
                                            size: "small"
                                        }, `mini-${i}-${j}`, false, {
                                            fileName: "[project]/src/components/GameBoard.tsx",
                                            lineNumber: 299,
                                            columnNumber: 17
                                        }, this)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-black rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-5 gap-1",
                                    children: mainBoard.map((row, i)=>row.map((color, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Cell, {
                                                color: color,
                                                onClick: ()=>handleMove(i, j)
                                            }, `main-${i}-${j}`, false, {
                                                fileName: "[project]/src/components/GameBoard.tsx",
                                                lineNumber: 309,
                                                columnNumber: 19
                                            }, this)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameBoard.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameBoard.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-1/3 flex flex-col items-center justify-center gap-4 p-8 bg-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: loadBoardsFromFile,
                                className: "w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
                                children: "Generar Nuevos Tableros"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: solvePuzzle,
                                disabled: isSolving,
                                className: "w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
                                children: isSolving ? 'Resolviendo...' : 'Resolver Puzzle'
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameBoard.tsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            boardHistory.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full px-8 pb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full flex items-center justify-center gap-4 p-4 rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: scrollLeft,
                            disabled: currentBoardIndex === 0,
                            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors",
                            children: "←"
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameBoard.tsx",
                            lineNumber: 343,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: sliderRef,
                            className: "flex overflow-x-auto transition-all duration-300 ease-in-out",
                            style: {
                                maxWidth: '800px',
                                scrollBehavior: 'smooth',
                                WebkitOverflowScrolling: 'touch',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            },
                            children: boardHistory.map((board, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex-shrink-0 p-2 transition-all duration-200 ${currentBoardIndex === index ? 'border-2 border-blue-500' : ''}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-5 gap-0.3",
                                        children: board.map((row, i)=>row.map((color, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Cell, {
                                                    color: color,
                                                    size: "tiny"
                                                }, `history-${index}-${i}-${j}`, false, {
                                                    fileName: "[project]/src/components/GameBoard.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 25
                                                }, this)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameBoard.tsx",
                                        lineNumber: 369,
                                        columnNumber: 19
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/src/components/GameBoard.tsx",
                                    lineNumber: 363,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameBoard.tsx",
                            lineNumber: 351,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: scrollRight,
                            disabled: currentBoardIndex === boardHistory.length - 1,
                            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors",
                            children: "→"
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameBoard.tsx",
                            lineNumber: 384,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/GameBoard.tsx",
                    lineNumber: 342,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 341,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Modal, {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                onPlayAgain: handlePlayAgain
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(SolutionModal, {
                isOpen: isSolutionModalOpen,
                onClose: ()=>setIsSolutionModalOpen(false),
                steps: solutionData.steps,
                time: parseFloat(solutionData.time)
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 402,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameBoard.tsx",
        lineNumber: 291,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = GameBoard;
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameBoard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/GameBoard.tsx [app-rsc] (ecmascript)"); // Import the GameBoard component
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen grid grid-rows-[1fr_auto]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameBoard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "p-4 flex gap-6 flex-wrap items-center justify-center bg-black",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "flex items-center gap-2 hover:underline hover:underline-offset-4",
                        href: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                "aria-hidden": true,
                                src: "/file.svg",
                                alt: "File icon",
                                width: 16,
                                height: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this),
                            "Learn"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "flex items-center gap-2 hover:underline hover:underline-offset-4",
                        href: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                "aria-hidden": true,
                                src: "/window.svg",
                                alt: "Window icon",
                                width: 16,
                                height: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            "Examples"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "flex items-center gap-2 hover:underline hover:underline-offset-4",
                        href: "https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                "aria-hidden": true,
                                src: "/globe.svg",
                                alt: "Globe icon",
                                width: 16,
                                height: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            "Go to nextjs.org →"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/page/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=_474016._.js.map