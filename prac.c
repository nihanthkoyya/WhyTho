#include <stdio.h>
#include <stdbool.h>

#define N 4

//solution matrix
void printSolution(int sol[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            printf("%d ", sol[i][j]);
        }
        printf("\n");
    }
}

// check if valid square 
bool isSafe(int maze[N][N], int x, int y) {
    return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);
}

// Option 1: Start (0,0) -> End (N-1, N-1)
bool solveMazeTLtoBR(int maze[N][N], int x, int y, int sol[N][N]) {
    if (x == N - 1 && y == N - 1 && maze[x][y] == 1) {
        sol[x][y] = 1;
        return true;
    }

    if (isSafe(maze, x, y)) {
        if (sol[x][y] == 1) return false; //if already visited
        
        sol[x][y] = 1;//mark as visited

        if (solveMazeTLtoBR(maze, x + 1, y, sol)) return true; //Down
        if (solveMazeTLtoBR(maze, x, y + 1, sol)) return true; //Right
        if (solveMazeTLtoBR(maze, x - 1, y, sol)) return true; //Up
        if (solveMazeTLtoBR(maze, x, y - 1, sol)) return true; //Left

        sol[x][y] = 0; //Backtrack go back 
        return false;
    }
    return false;
}

// Option 2: Start (0, N-1) -> End (N-1, 0)
bool solveMazeTRtoBL(int maze[N][N], int x, int y, int sol[N][N]) {
    if (x == N - 1 && y == 0 && maze[x][y] == 1) {
        sol[x][y] = 1;
        return true;
    }

    if (isSafe(maze, x, y)) {
        if (sol[x][y] == 1) return false;
        sol[x][y] = 1;

        if (solveMazeTRtoBL(maze, x + 1, y, sol)) return true;
        if (solveMazeTRtoBL(maze, x, y - 1, sol)) return true;
        if (solveMazeTRtoBL(maze, x - 1, y, sol)) return true;
        if (solveMazeTRtoBL(maze, x, y + 1, sol)) return true;

        sol[x][y] = 0; // Backtrack
        return false;
    }
    return false;
}

// Resets the solution matrix
void resetSolution(int sol[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            sol[i][j] = 0;
        }
    }
}

int main() {
    // 1 = Path  0 = Wall
    int maze[N][N] = {
        {1, 1, 0, 1},
        {0, 1, 1, 1},
        {0, 0, 1, 0},
        {1, 1, 1, 1}
    };
    
    int sol[N][N];
    int choice;

    do {
        printf("\n--- Rat in a Maze  ---\n");
        printf("1. Top-Left to Bottom-Right\n");
        printf("2. Top-Right to Bottom-Left\n");
        printf("3. Exit\n");
        printf("Choice: ");
        scanf("%d", &choice);

        resetSolution(sol);

        switch (choice) {
            case 1:
                printf("\nPath (Top-Left to Bottom-Right):\n");
                if (solveMazeTLtoBR(maze, 0, 0, sol)) {
                    printSolution(sol);
                } else {
                    printf("No solution exists.\n");
                }
                break;
            case 2:
                printf("\nPath (Top-Right to Bottom-Left):\n");
                // Start coordinates: Row 0, Column N-1
                if (solveMazeTRtoBL(maze, 0, N - 1, sol)) {
                    printSolution(sol);
                } else {
                    printf("No solution exists.\n");
                }
                break;
            case 3:
                printf("BYE BYE\n");
                break;
            default:
                printf("Invalid choice.\n");
        }
    } while (choice != 3);

    return 0;
}