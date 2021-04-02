#!/usr/bin/env node

import { makepuzzle, solvepuzzle, ratepuzzle } from 'sudoku';
import * as prompt from "prompt-promise";

type Cell = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 100 | 200 | 300 | 400;
type Sudoku = Cell[];

const puzzle: Sudoku = makepuzzle();
const solution = solvepuzzle(puzzle);

// const query: Promise<string> = prompt("Wanna play Sudoku? You will see the grid in the command line but you have to solve it on paper.\nWhen you are done playing press enter again and see the solution.\nTo continue press 'y', to stop press 'n'");


let rows: Array<any[]> = [];
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

}


const cellToPrettyString = (cell: Cell): string => {
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

const stringifySudoku = (sudoku: Sudoku): string => {
  return `========================================\n|${rows.map(row => row.map(cellToPrettyString).join("")).join("")}`;
}
const newSudoku = () => {
  createLinebreaks(puzzle);
  console.log(stringifySudoku(puzzle));
};

const showSolution = () => {
  createLinebreaks(solution);
  console.log(stringifySudoku(solution));
}
const startSudoku = () => {
  prompt("Wanna play Sudoku? You will see the grid in the command line but you have to solve it on paper.\nWhen you are done playing press enter again and see the solution.\nTo continue press 'y', to stop press 'n'.").then((query: any) => {
    if (query === 'y') {
      newSudoku();
      prompt("Curious to see the solution? Press 'y' once more (or anything else to leave the game)")
    } else {
      prompt.finish()
    }
  }).then((response: any) => {
    if (response === 'y') {
      showSolution();
      prompt("One more game? Press 'y' again!")
    } else {
      prompt.finish();
    }
  }).then((response: any) => {
    if (response === 'y') {
      startSudoku();
    } else {
      prompt.finish()
    }
  })
}

startSudoku();
