import { makepuzzle } from 'sudoku';

export type Cell = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Sudoku = Cell[];

const puzzle: Sudoku = makepuzzle();

const createLinebreaks = function (puzzle: Sudoku) {
  let rows = [];
  let sliceEnd: number
  for (let i = 1; i < 82; i += 1) {
    if (i % 9 === 0) {
      let sliceStart: number = (i < 10) ? 0 : sliceEnd;
      sliceEnd = i;
      // console.log(sliceStart, sliceEnd);
      rows.push(puzzle.slice(sliceStart, sliceEnd));
      sliceStart = sliceEnd;
      // console.log(rows);
      // console.log(sliceStart, sliceEnd);
    };
  }

  return rows;
}

createLinebreaks(puzzle);

const cellToPrettyString = function (cell: Cell): string {
  if (cell === null) {
    return " ";
  }
  return (cell + 1).toString();
}

export const stringifySudoku = function (sudoku: Sudoku): string {
  return rows.map(cellToPrettyString).join("");
}


// console.log(stringifySudoku(puzzle));