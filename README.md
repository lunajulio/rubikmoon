# Rubikmoon 🚀

## Índice

1. Descripción del Proyecto
2. Funcionamiento del Algoritmo A*
3. Instalación del Programa
4. Uso del programa

## Descripción del Proyecto

![Logo](./cubo)

RubikMoon es una aplicación web interactiva diseñada con Next.js y React que permite a los usuarios resolver un puzzle basado en un tablero de 5x5 con una sección objetivo de 3x3. La aplicación utiliza el algoritmo A* para encontrar la solución óptima y guía al usuario paso a paso para resolver el puzzle.

## Funcionamiento del Algoritmo A*

El algoritmo A* es un algoritmo de búsqueda que encuentra el camino más corto desde un punto inicial hasta un punto objetivo. En este proyecto, se utiliza para encontrar la secuencia de movimientos que resuelven el puzzle.

### Pasos del Algoritmo A*

1. **Inicialización**: Se inicializa el estado inicial del tablero y se calcula el valor heurístico (h_n) utilizando la heurística de Manhattan.
2. **Búsqueda**: Se utiliza una cola de prioridad para explorar los estados del tablero. En cada paso, se selecciona el estado con el menor costo total (f_n = g_n + h_n).
3. **Expansión**: Se generan todos los posibles movimientos desde el estado actual y se calculan los nuevos estados del tablero.
4. **Verificación de Objetivo**: Si el estado actual coincide con el estado objetivo, se reconstruye el camino desde el estado inicial hasta el estado objetivo.
5. **Devolución de la Solución**: Se devuelve la secuencia de movimientos que resuelven el puzzle.

## Instalación del Programa

### Requisitos Previos

- Node.js
- npm (Node Package Manager)
- Python 3.x
- FastAPI

### Pasos de Instalación

1. Clonar el repositorio:
   
   ```shell
   git clone https://github.com/tu-usuario/rubikmoon.git
   cd rubikmoon
   ```

2. Navega al directorio del frontend e instala las dependencias:
   
   ```shell
   cd frontend
   npm install
   ```

3. Navega al directorio del backend e instala las dependencias (si es necesario):
   
   ```shell
   cd backend
       # Instala las dependencias de Python si es necesario
   ```

## Uso

1. Iniciar el backend:
   
   ```shell
   cd backend
   python -m uvicorn main:app --reload
   ```

2. Iniciar el frontend:
   
   ```shell
   cd frontend
   npm run dev
   ```


