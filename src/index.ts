import { makepuzzle } from 'sudoku';
import * as prompt from "prompt-promise";

type Cell = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 100;
type Sudoku = Cell[];

const puzzle: Sudoku = makepuzzle();

let rows = [];
const createLinebreaks = (sudoku: Sudoku) => {
  let sliceEnd: number
  for (let i = 1; i < 82; i += 1) {
    if (i % 9 === 0) {
      let sliceStart: number = (i < 10) ? 0 : sliceEnd;
      sliceEnd = i;
      rows.push(sudoku.slice(sliceStart, sliceEnd));
      sliceStart = sliceEnd;
    };
  }

  rows.map(row => {
    // row.unshift("|");
    if (rows.indexOf(row) < rows.length - 1) {
      row.push(100);
    };
  });

}

createLinebreaks(puzzle);

const cellToPrettyString = (cell: Cell): string => {
  if (cell === null) {
    return "   |";
  } else if (cell === 100) {
    return "\n—————————————————————————————————————\n|"
  } else if (typeof (cell) === "number") {
    return ` ${cell + 1} |`;
  }
}

const stringifySudoku = (sudoku: Sudoku): string => {
  return rows.map(row => row.map(cellToPrettyString).join("")).join("");
}
console.log(puzzle);
console.log(stringifySudoku(puzzle));