(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_ea1596._.js", {

"[project]/src/components/Cell.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
'use client';
;
;
// Definir la animación de temblor
const shake = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;
// Definir el componente de celda con la animación de temblor
const StyledCell = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  width: ${({ size })=>size === 'tiny' ? '16px' : size === 'small' ? '32px' : '64px'};
  height: ${({ size })=>size === 'tiny' ? '16px' : size === 'small' ? '32px' : '64px'};
  background-color: ${({ color })=>color};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  animation: ${({ isShaking })=>isShaking ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"]`${shake} 0.5s` : 'none'};
`;
_c = StyledCell;
const Cell = ({ color, onClick, isShaking = false, size = 'default' })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StyledCell, {
        color: color,
        onClick: onClick,
        isShaking: isShaking,
        size: size
    }, void 0, false, {
        fileName: "[project]/src/components/Cell.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
};
_c1 = Cell;
const __TURBOPACK__default__export__ = Cell;
var _c, _c1;
__turbopack_refresh__.register(_c, "StyledCell");
__turbopack_refresh__.register(_c1, "Cell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Modal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Modal = ({ isOpen, onClose, onPlayAgain })=>{
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-8 rounded-lg shadow-lg text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-4 text-black",
                    children: "¡Puzzle completado!"
                }, void 0, false, {
                    fileName: "[project]/src/components/Modal.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-8 text-black",
                    children: "¡Felicidades! Has completado el puzzle."
                }, void 0, false, {
                    fileName: "[project]/src/components/Modal.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors",
                            children: "Aceptar"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Modal.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onPlayAgain,
                            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
                            children: "Jugar de nuevo"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Modal.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Modal.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Modal.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Modal.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = Modal;
const __TURBOPACK__default__export__ = Modal;
var _c;
__turbopack_refresh__.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/SolutionModal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// components/SolutionModal.tsx
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const SolutionModal = ({ isOpen, onClose, steps, time })=>{
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-8 rounded-lg shadow-lg text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-4 text-black",
                    children: "¡Solución encontrada!"
                }, void 0, false, {
                    fileName: "[project]/src/components/SolutionModal.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 p-4 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-semibold text-black",
                                children: [
                                    "Número de pasos: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600",
                                        children: steps
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SolutionModal.tsx",
                                        lineNumber: 22,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SolutionModal.tsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/SolutionModal.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 p-4 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-semibold text-black",
                                children: [
                                    "Tiempo: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600",
                                        children: time
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SolutionModal.tsx",
                                        lineNumber: 28,
                                        columnNumber: 23
                                    }, this),
                                    " segundos"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SolutionModal.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/SolutionModal.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SolutionModal.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
                        children: "Aceptar"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SolutionModal.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SolutionModal.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SolutionModal.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SolutionModal.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
};
_c = SolutionModal;
const __TURBOPACK__default__export__ = SolutionModal;
var _c;
__turbopack_refresh__.register(_c, "SolutionModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/GameBoard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Cell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SolutionModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/SolutionModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
const COLORS = {
    YELLOW: '#ffd000',
    GREEN: '#2db48e',
    BLUE: '#3291d1',
    BLUED: '#3b21e4',
    PURPLE: '#8a1aee',
    CLARITO: '#8c8cd4',
    GRAY: '#000000' // Casilla vacía
};
const GameBoard = ()=>{
    _s();
    const [mainBoard, setMainBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [miniBoard, setMiniBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [solution, setSolution] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isSolving, setIsSolving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentInstruction, setCurrentInstruction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [solutionSteps, setSolutionSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentStepIndex, setCurrentStepIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isGuiding, setIsGuiding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [boardHistory, setBoardHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const sliderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [currentBoardIndex, setCurrentBoardIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isSolutionModalOpen, setIsSolutionModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [solutionData, setSolutionData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        steps: 0,
        time: '0.00'
    });
    const [isPuzzleCompleted, setIsPuzzleCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shakingCell, setShakingCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
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
            setShakingCell({
                row,
                col
            });
            setTimeout(()=>{
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
                setShakingCell({
                    row,
                    col
                });
                setTimeout(()=>{
                    setShakingCell(null);
                }, 500);
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
        // Verificar si steps es null o undefined
        if (!steps || !Array.isArray(steps)) {
            console.error("La solución no es válida o está vacía");
            return false;
        }
        let currentBoard = mainBoard.map((row)=>[
                ...row
            ]);
        for (const step of steps){
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
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "GameBoard.useEffect": ()=>{
            loadBoardsFromFile();
        }
    }["GameBoard.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2/3 flex flex-col items-center justify-center gap-8 p-8 bg-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-1",
                                children: miniBoard.map((row, i)=>row.map((color, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            color: color,
                                            size: "small"
                                        }, `mini-${i}-${j}`, false, {
                                            fileName: "[project]/src/components/GameBoard.tsx",
                                            lineNumber: 355,
                                            columnNumber: 17
                                        }, this)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-black rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-5 gap-1",
                                    children: mainBoard.map((row, i)=>row.map((color, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                color: color,
                                                onClick: ()=>handleMove(i, j),
                                                isShaking: shakingCell?.row === i && shakingCell?.col === j
                                            }, `main-${i}-${j}`, false, {
                                                fileName: "[project]/src/components/GameBoard.tsx",
                                                lineNumber: 365,
                                                columnNumber: 19
                                            }, this)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GameBoard.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameBoard.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-1/3 flex flex-col items-center justify-center gap-4 p-8 bg-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: loadBoardsFromFile,
                                className: "w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
                                children: "Generar Nuevos Tableros"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 379,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: solvePuzzle,
                                disabled: isSolving,
                                className: "w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
                                children: isSolving ? 'Resolviendo...' : 'Resolver Puzzle'
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameBoard.tsx",
                                lineNumber: 386,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameBoard.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this),
            boardHistory.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full px-8 pb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full flex items-center justify-center gap-4 p-4 rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: scrollLeft,
                            disabled: currentBoardIndex === 0,
                            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors",
                            children: "←"
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameBoard.tsx",
                            lineNumber: 400,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: sliderRef,
                            className: "flex overflow-x-auto transition-all duration-300 ease-in-out",
                            style: {
                                maxWidth: '800px',
                                scrollBehavior: 'smooth',
                                WebkitOverflowScrolling: 'touch',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            },
                            children: boardHistory.map((board, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex-shrink-0 p-2 transition-all duration-200 ${currentBoardIndex === index ? 'border-2 border-blue-500' : ''}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-5 gap-0.3",
                                        children: board.map((row, i)=>row.map((color, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    color: color,
                                                    size: "tiny"
                                                }, `history-${index}-${i}-${j}`, false, {
                                                    fileName: "[project]/src/components/GameBoard.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 25
                                                }, this)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GameBoard.tsx",
                                        lineNumber: 426,
                                        columnNumber: 19
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/src/components/GameBoard.tsx",
                                    lineNumber: 420,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameBoard.tsx",
                            lineNumber: 408,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: scrollRight,
                            disabled: currentBoardIndex === boardHistory.length - 1,
                            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors",
                            children: "→"
                        }, void 0, false, {
                            fileName: "[project]/src/components/GameBoard.tsx",
                            lineNumber: 441,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/GameBoard.tsx",
                    lineNumber: 399,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 398,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                onPlayAgain: handlePlayAgain
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 453,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SolutionModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isSolutionModalOpen,
                onClose: ()=>setIsSolutionModalOpen(false),
                steps: solutionData.steps,
                time: parseFloat(solutionData.time)
            }, void 0, false, {
                fileName: "[project]/src/components/GameBoard.tsx",
                lineNumber: 459,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameBoard.tsx",
        lineNumber: 347,
        columnNumber: 5
    }, this);
};
_s(GameBoard, "krQGuljmlZaKNREX1hsLQIy9bRE=");
_c = GameBoard;
const __TURBOPACK__default__export__ = GameBoard;
var _c;
__turbopack_refresh__.register(_c, "GameBoard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_ea1596._.js.map