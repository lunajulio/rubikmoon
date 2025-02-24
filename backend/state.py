
class state:
    def __init__(self, board_state, g_n, parent=None):
        self.board_state = board_state  # board state of that given state
        self.g_n = g_n                  # cost from start to current node g(n)
        self.h_n = 0                    # heuristic estimate from n to goal h(n)
        self.f_n = 0                    # f(n) = g(n) + h(n)
        self.parent = parent            # for path reconstruction
        self.movement = None
        self.empty_pos = self.find_empty()

    def find_empty(self):
        for i in range(5):
            for j in range(5):
                if self.board_state[i][j] == '*':
                    return (i, j)
        return None
    
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