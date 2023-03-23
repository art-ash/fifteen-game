import * as types from "./types";
import { IState, IAction } from "../interfaces";

const winCase1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const winCase2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

const win1Sting = JSON.stringify(winCase1);
const win2Sting = JSON.stringify(winCase2);

const initialState: IState = {
  cells: winCase1,
  boardCoordinates: {
    x: null,
    y: null,
  },
  blankCellCoordinates: {
    x: null,
    y: null,
  },
  isWin: false,
  moves: 0,
};

export default function (state = initialState, action: IAction) {
  switch (action.type) {
    case types.CELLS_SHUFFLE: {
      const { cells } = state;
      const newCells = cells.slice();
      newCells.sort(() => Math.random() - 0.5);

      return {
        ...state,
        cells: newCells,
        isWin: false,
        moves: 0,
      };
    }

    case types.SET_COORDINATES_BOARD: {
      const node = action.payload;

      return {
        ...state,
        boardCoordinates: {
          x: node.offsetLeft,
          y: node.offsetTop,
        },
      };
    }

    case types.SET_COORDINATES_BLANKCELL: {
      const node = action.payload;

      return {
        ...state,
        blankCellCoordinates: {
          x: node.offsetLeft,
          y: node.offsetTop,
        },
      };
    }

    case types.CELLS_REORDER: {
      const index = action.payload;
      const { cells, moves } = state;

      const cellsString = JSON.stringify(cells);
      const newCells = cells.slice();
      const blankIndex = newCells.findIndex((item) => item === 0);
      const removed = newCells.splice(index, 1, 0);
      newCells.splice(blankIndex, 1, removed[0]);

      return {
        ...state,
        cells: newCells,
        moves: moves + 1,
        isWin: cellsString === win1Sting || cellsString === win2Sting,
      };
    }

    default:
      return state;
  }
}
