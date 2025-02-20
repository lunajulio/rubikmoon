# test_solver.py
import unittest
from main import a_star, manhattan_heuristic  # Importa las funciones necesarias

class TestSolver(unittest.TestCase):
    def test_specific_puzzle(self):
        # Definir el tablero objetivo (meta)
        goal = [
            ['N', 'B', 'R'],
            ['A', 'A', 'V'],
            ['A', 'Z', 'Z']
        ]

        # Definir el tablero inicial
        start = [
            ['V', 'Z', 'N', 'V', 'Z'],
            ['R', 'B', 'Z', 'R', 'R'],
            ['B', 'R', '*', 'B', 'N'],
            ['A', 'A', 'V', 'V', 'Z'],
            ['N', 'A', 'A', 'B', 'N']
        ]

        # Ejecutar el algoritmo
        solution = a_star(start, goal, "manhattan")

        # Verificar que se encontró una solución
        self.assertIsNotNone(solution, "No se encontró solución para el puzzle específico")

        if solution:
            # Verificar que la solución llega al estado objetivo
            final_state = solution[-1][0]  # Último estado del tablero
            
            # Verificar el patrón 3x3 central
            for i in range(3):
                for j in range(3):
                    self.assertEqual(
                        final_state[i+1][j+1], 
                        goal[i][j], 
                        f"El estado final no coincide con el objetivo en la posición ({i}, {j})"
                    )

            print(f"Solución encontrada en {len(solution)} pasos")
            # Imprimir la secuencia de movimientos
            for i, (board, move) in enumerate(solution):
                print(f"\nPaso {i + 1}:")
                for row in board:
                    print(''.join(row))
                print(f"Movimiento: {move}")

if __name__ == '__main__':
    unittest.main()