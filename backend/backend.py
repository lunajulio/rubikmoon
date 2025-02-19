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
    '#000000': '0'   # GRAY (espacio vacío)
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

def a_star(start, goal, heuristic):
    # cerates initial state with g(n) = 0
    start_state = state(start, 0)
    start_state.h_n = get_h_n(start_state.board_state, goal, heuristic)
    start_state.get_f_n()

    # start the search space with the start_state
    search_space = PriorityQueue()
    search_space.put((start_state.f_n, start_state))

    # stores all the states arleady seen
    # they are stores as string in order to compare them to current states
    seen_states = set()

    # iterating through search_space until it beoicmes empty
    while not search_space.empty():
        # extracts the first state on the priority queue (the one with lowest f(n))
        current_state = search_space.get()[1]
        # gets the current board state as a string
        current_state_str = str(current_state.board_state)
        # checks if the current board_state as string is arleady on the seen_states set
        if current_state_str in seen_states:
            continue
        else: 
            # if the current state is the goal it builds the path and returns it 
            if check_goal(current_state.board_state, goal):
                print("Solution found")
                return get_path(current_state)
            # adds current state to seen states 
            seen_states.add(current_state_str)
    
            # create the states avaliable from the current one (expands the node)
            # based on all the possible movements 
            possible_moves, empty_cell_pos = get_possible_moves(current_state.board_state)

            # adds all moves that are possible from the current state
            # (expanding the nodes by creating new states)
            for possible_move in possible_moves:
                # gets the new state's board
                new_board_state = get_new_board_state(possible_move, empty_cell_pos, current_state.board_state)
                # creates a new node (state created by new move), increases the g(n) by 1 as a new move is made
                new_state = state(new_board_state, current_state.g_n + 1, current_state)
                new_state.movement = possible_move
                # gets the h_n and f_n based on the chosen heuristic
                new_state.h_n = get_h_n(new_board_state, goal, heuristic)
                new_state.get_f_n()
                # if the new state hasnt been seen, add it to the search space 
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

def get_direction(from_coord, to_coord):
    if not to_coord or from_coord:
        return "Initial State"
    # Unpack coordinates
    x1, y1 = from_coord
    x2, y2 = to_coord
    
    # Calculate differences
    dx = x2 - x1
    dy = y2 - y1

    # Direction mappings (if you need to convert to strings)
    map = {
        (0, 1): "RIGHT",
        (0, -1): "LEFT",
        (1, 0): "DOWN",
        (-1, 0): "UP"
    }

    return map.get((dx,dy))



@app.post("/api/solve")
async def solve_puzzle(data: BoardData):
    try:
        # Convertir matrices de colores a letras
        COLOR_TO_LETTER = {
            '#ffd000': 'Y',  # YELLOW
            '#2db48e': 'G',  # GREEN
            '#3291d1': 'B',  # BLUE
            '#3b21e4': 'D',  # BLUED
            '#8a1aee': 'P',  # PURPLE
            '#8c8cd4': 'C',  # CLARITO
            '#000000': '*'   # GRAY (espacio vacío)
        }

        # Convertir el tablero principal
        main_board_letters = [
            [COLOR_TO_LETTER[color] for color in row]
            for row in data.mainBoard
        ]

        # Convertir el tablero objetivo
        target_board_letters = [
            [COLOR_TO_LETTER[color] for color in row]
            for row in data.targetBoard
        ]

        print("Tablero principal en letras:", main_board_letters)
        print("Tablero objetivo en letras:", target_board_letters)

        # Usar el algoritmo A* para encontrar la solución
        solution = a_star(main_board_letters, target_board_letters, "manhattan")

        if solution:
            # Convertir la solución de vuelta a colores
            LETTER_TO_COLOR = {v: k for k, v in COLOR_TO_LETTER.items()}
            solution_steps = []
            
            for board_state, movement in solution:
                # Convertir cada estado del tablero de letras a colores
                board_colors = [
                    [LETTER_TO_COLOR[letter] for letter in row]
                    for row in board_state
                ]
                solution_steps.append({
                    "board": board_colors,
                    "movement": movement
                })

            return {
                "success": True,
                "solution": solution_steps,
                "steps": len(solution_steps)
            }
        else:
            return {
                "success": False,
                "message": "No se encontró solución"
            }

    except Exception as e:
        print("Error en el backend:", str(e))
        raise HTTPException(status_code=500, detail=str(e))