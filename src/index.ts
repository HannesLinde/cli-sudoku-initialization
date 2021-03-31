import { makepuzzle } from 'sudoku';

export type Cell = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 100;
export type Sudoku = Cell[];

const puzzle: Sudoku = makepuzzle();

let rows = [];
const createLinebreaks = function (puzzle: Sudoku) {
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

  rows.map(row => {
    row.push(100);
  });

}
createLinebreaks(puzzle);

const cellToPrettyString = function (cell: Cell): string {
  if (cell === null) {
    return " ";
  } else if (cell === 100) {
    return "\\n"
  } else {
    return (cell + 1).toString();
  }
}

export const stringifySudoku = function (sudoku: Sudoku): string {
  return rows.map(row => row.map(cellToPrettyString).join("")).join("");
}

console.log(puzzle);
console.log(stringifySudoku(puzzle));