import { makepuzzle } from 'sudoku';

export const add = function (a: number, b: number) {
  return a + b;
}

type Cell = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Sudoku = Cell[];

const stringifySudoku = function (sudoku: Sudoku): string {
  return ""
}

const puzzle: Sudoku = makepuzzle();

console.log(stringifySudoku(puzzle));