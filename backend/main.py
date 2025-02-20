from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from queue import PriorityQueue
import copy
import time

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ajusta según tu configuración
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint de prueba
@app.get("/test")
async def test_endpoint():
    return {"message": "Backend está funcionando!"}

# Mapeo de colores a letras
COLOR_TO_LETTER = {
    '#ffd000': 'Y',  # YELLOW
    '#2db48e': 'G',  # GREEN
    '#3291d1': 'B',  # BLUE
    '#3b21e4': 'D',  # BLUED
    '#8a1aee': 'P',  # PURPLE
    '#8c8cd4': 'C',  # CLARITO
    '#000000': '*'   # GRAY (espacio vacío)
}

LETTER_TO_COLOR = {v: k for k, v in COLOR_TO_LETTER.items()}


class BoardData(BaseModel):
    mainBoard: List[List[str]]
    targetBoard: List[List[str]]


# placeholder heuristic function
def get_h_n(state, goal, heuristic):
    pass

# checks if a board state is the goal pattern (condition to win)
def check_goal(current_board_state, goal):
    # check if the center 3x3 matches the goal pattern
    for i in range(3):
        for j in range(3):
            if current_board_state[i+1][j+1] != goal[i][j]:
                return False
    return True

# gets the path from the last state using the parent property of the state in order to go back
def get_path(current_state):
    path = []
    # gets the path until it reaches the first state for which the parent property is None
    while current_state:
        path.append((current_state.board_state, current_state.movement))
        current_state = current_state.parent
    return path[::-1]

# gets all the possible moves based on the current state of the board 
# a move is defined by the change of the position of the empty cell 
def get_possible_moves(current_board_state):
    empty_cell_pos = None
    # stores all possible moves
    possible_moves = set()
    # gets the position where the empty cell is 
    for i in range (5):
        for j in range(5):
            if (current_board_state[i][j] == '*'):
                empty_cell_pos = (i,j)
                break 
    # Possible directions: up, right, down, left
    possible_directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    #gets all the possible positions of the movements
    for dx, dy in possible_directions: 
        moved_x, moved_y = empty_cell_pos[0] + dx, empty_cell_pos[1] + dy
        # checks if the new positionts are within bounds
        if (0 <= moved_x < 5 and 0 <= moved_y < 5):
            possible_moves.add((moved_x, moved_y))  # Using add() instead of append()
    return possible_moves, empty_cell_pos

def get_new_board_state(possible_move, empty_cell_pos, current_state_board):
    new_board_state = copy.deepcopy(current_state_board)

    # coordinates of the position of the empty cell
    empty_row, empty_col = empty_cell_pos
    # coordinates of the empty_cell after performing the movement
    new_row, new_col = possible_move
    # gets the tile state of the tile taht was in the position where the empty one will be 
    tile = new_board_state[new_row][new_col] 
    # swaps the empty value to the new position and the tile to the position where the empty one was 
    new_board_state[new_row][new_col] = "*"
    new_board_state[empty_row][empty_col] = tile

    return new_board_state

class state:
    def __init__(self, board_state, g_n, parent=None):
        self.board_state = board_state  # board state of that given state
        self.g_n = g_n                  # cost from start to current node g(n)
        self.h_n = 0                    # heuristic estimate from n to goal h(n)
        self.f_n = 0                    # f(n) = g(n) + h(n)
        self.parent = parent            # for path reconstruction
        self.movement = None

    def get_f_n(self):
        self.f_n = self.g_n + self.h_n

    # function that ensures that the priority queue gets the most promissing state 
    # the one with lower f(n), it has to be named like that to properly work with the pq library
    def __lt__(self, other_state):
        # compare f(n)
        if (self.f_n != other_state.f_n):
            return self.f_n < other_state.f_n
        # If f_scores are equal, compare h_scores
        return self.h_n < other_state.h_n

def a_star(start, goal, heuristic, time_limit=100):  # Agregamos el parámetro time_limit
    start_time = time.time()  # Registramos el tiempo de inicio
    
    start_state = state(start, 0)
    start_state.h_n = get_h_n(start_state.board_state, goal, heuristic)
    start_state.get_f_n()

    search_space = PriorityQueue()
    search_space.put((start_state.f_n, start_state))
    seen_states = set()

    while not search_space.empty():
        # Verificar si se excedió el límite de tiempo
        if time.time() - start_time > time_limit:
            print(f"Tiempo límite de {time_limit} segundos excedido")
            return None

        current_state = search_space.get()[1]
        current_state_str = str(current_state.board_state)
        
        if current_state_str in seen_states:
            continue
        else: 
            if check_goal(current_state.board_state, goal):
                elapsed_time = time.time() - start_time
                print(f"Solución encontrada en {elapsed_time:.2f} segundos")
                return get_path(current_state)
                
            seen_states.add(current_state_str)
            possible_moves, empty_cell_pos = get_possible_moves(current_state.board_state)

            for possible_move in possible_moves:
                new_board_state = get_new_board_state(possible_move, empty_cell_pos, current_state.board_state)
                new_state = state(new_board_state, current_state.g_n + 1, current_state)
                new_state.movement = possible_move
                new_state.h_n = get_h_n(new_board_state, goal, heuristic)
                new_state.get_f_n()
                
                if str(new_board_state) not in seen_states:
                    search_space.put((new_state.f_n, new_state))

    return None


def manhattan_heuristic(current_board_state, goal):
    # for this heuristc h_n is the total distance 
    # between all the goal board's tiles color and the closest tile of the same color on the current board
    h_n = 0
    # Calculate for the 3x3 center pattern
    for target_y in range(3):
        for target_x in range(3):
            target_tile = goal[target_y][target_x]
            # Find the closest matching tile
            min_distance = float('inf')
            for current_y in range(5):
                for current_x in range(5):
                    if current_board_state[current_y][current_x] == target_tile:
                        distance = abs(current_x - (target_x+1)) + abs(current_y - (target_y+1))
                        min_distance = min(min_distance, distance)
            h_n += min_distance
    return h_n

def get_h_n(current_board_state, goal, heuristic):
    if (heuristic == "manhattan"):
        h_n = manhattan_heuristic(current_board_state, goal)
    return h_n

def get_direction(from_coord, to_coord, board_state):
    try:
        if to_coord is None:
            return "Estado Inicial"
            
        # Mapeo de letras a nombres de colores en español
        color_names = {
            'Y': 'AMARILLA',
            'G': 'VERDE',
            'B': 'AZUL',
            'D': 'AZUL OSCURO',
            'P': 'MORADA',
            'C': 'CELESTE',
            '*': 'VACÍO'
        }

        # Encontrar la posición del espacio vacío
        empty_pos = None
        for i in range(len(board_state)):
            for j in range(len(board_state[i])):
                if board_state[i][j] == '*':
                    empty_pos = (i, j)
                    break
            if empty_pos:
                break

        if empty_pos is None:
            return "Error: No se encontró el espacio vacío"

        # Determinar qué ficha se debe mover basado en la posición del espacio vacío
        x, y = empty_pos
        directions = {
            'arriba': (x-1, y) if x > 0 else None,
            'abajo': (x+1, y) if x < 4 else None,
            'izquierda': (x, y-1) if y > 0 else None,
            'derecha': (x, y+1) if y < 4 else None
        }

        # Encontrar la dirección correcta
        for direction, pos in directions.items():
            if pos == to_coord:
                color_to_move = board_state[pos[0]][pos[1]]
                color_name = color_names.get(color_to_move, 'desconocida')
                return f"Mueve la ficha {color_name} hacia {direction}"

        print(f"Debug - Empty pos: {empty_pos}, To coord: {to_coord}, Board state: {board_state}")
        return "Sigue las instrucciones para mover las fichas"

    except Exception as e:
        print(f"Error en get_direction: {e}")
        return f"Error en las instrucciones: {str(e)}"

@app.post("/api/solve")
async def solve_puzzle(data: BoardData):
    try:
        print("Datos recibidos:", data)
        # Convertir matrices de colores a letras
        main_board_letters = [
            [COLOR_TO_LETTER[color] for color in row]
            for row in data.mainBoard
        ]

        target_board_letters = [
            [COLOR_TO_LETTER[color] for color in row]
            for row in data.targetBoard
        ]

        print("Tablero principal en letras:", main_board_letters)
        print("Tablero objetivo en letras:", target_board_letters)

        # Usar el algoritmo A* para encontrar la solución
        start_time = time.time()
        solution = a_star(main_board_letters, target_board_letters, "manhattan")
        elapsed_time = time.time() - start_time

        if solution:
            solution_steps = []
            previous_pos = None
            
            for board_state, movement in solution:
                board_colors = [
                    [LETTER_TO_COLOR[letter] for letter in row]
                    for row in board_state
                ]
                
                direction = get_direction(previous_pos, movement, board_state)
                previous_pos = movement
                
                solution_steps.append({
                    "board": board_colors,
                    "movement": movement,
                    "direction": direction
                })

            return {
                "success": True,
                "solution": solution_steps,
                "steps": len(solution_steps),
                "time": f"{elapsed_time:.2f}"
            }

    except Exception as e:
        print("Error en el backend:", str(e))
        raise HTTPException(status_code=500, detail=str(e))