import { makepuzzle, solvepuzzle } from 'sudoku';
import * as prompt from "prompt-promise";

type Cell = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 100 | 200 | 300 | 400;
type Sudoku = Cell[];
type Rows = Array<any[]>;

// sudoku package functions
const puzzle = makepuzzle(); // gives out new Sudoku
const solution = solvepuzzle(puzzle); // displays solutions

let rows: Rows = [];

// transforming puzzle into a well readable string with several helper functions
const createArraysForEachGridLine = (sudoku: Sudoku): Rows => {
  let sliceEnd: number
  for (let i = 1; i < 82; i += 1) {
    if (i % 9 === 0) {
      let sliceStart: number = (i < 10) ? 0 : sliceEnd;
      sliceEnd = i;
      rows.push(sudoku.slice(sliceStart, sliceEnd));
      sliceStart = sliceEnd;
    };
  }
  return rows;
}

const insertGridMarkers = (rows: Rows): Rows => {
  rows.map(row => {
    if ((rows.indexOf(row) + 1) % 3 === 0 && rows.indexOf(row) < rows.length - 1) {
      row.push(100);
    } else if (rows.indexOf(row) === (rows.length - 1)) {
      row.push(200);
    } else {
      row.push(300);
    };
    row.splice(3, 0, 400);
    row.splice(7, 0, 400);
  });
  return rows;
}

const prepareBasicString = (sudoku: Sudoku) => {
  createArraysForEachGridLine(sudoku);
  insertGridMarkers(rows);
}

const basicStringToUsefulString = (cell: Cell): string => {
  if (cell === null) {
    return "   ¦";
  } else if (cell === 100) {
    return "│\n========================================\n│"
  } else if (cell === 200) {
    return "│\n========================================\n"
  } else if (cell === 300) {
    return "│\n────────────────────────────────────────\n│"
  } else if (cell === 400) {
    return "¦"
  } else if (typeof (cell) === "number") {
    return ` ${cell + 1} ¦`;
  }
}

// print the string into a grid that resembles a typical sudoku
const stringToGrid = (): string => {
  return `========================================\n|${rows.map(row => row.map(basicStringToUsefulString).join("")).join("")}`
}

// brings together the string and the printing method
const drawSudoku = (sudoku: Sudoku): string => {
  prepareBasicString(sudoku);
  return stringToGrid();
}
export const startSudoku = () => {
  prompt("Wanna play Sudoku? You will see the grid in the command line but you have to solve it on paper.\nWhen you are done playing, check the command line to ask for the solution.\nTo get started press 'y', to stop press 'n'.").then((query: any) => {
    if (query === 'y') {
      console.log(drawSudoku(puzzle));
      return prompt("Curious to see the solution? Press 'y' (or anything else to leave the game).")
    } else {
      prompt.finish()
    }
  }).then((response: any) => {
    if (response === 'y') {
      rows = [];
      console.log(drawSudoku(solution));
      return prompt("One more game? Press 'y' again (or anything else to leave the game)!")
    } else {
      prompt.finish();
    }
  }).then((response: any) => {
    if (response === 'y') {
      rows = [];
      startSudoku();
    } else {
      prompt.finish()
    }
  })
}