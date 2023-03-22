import {
  SHUFFLE_CELLS,
  SET_BOARD_COORDINATES,
  SET_BLANK_CELL_COORDINATES,
  REORDER_CELLS,
  CHECK_FOR_WIN,
  INCREMENT_MOVES,
} from "../actions/actionTypes";
import { IState, IAction } from "../interfaces";

const winCase1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const winCase2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

const initialState: IState = {
  cells: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
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
    case SHUFFLE_CELLS: {
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

    case SET_BOARD_COORDINATES: {
      const { node } = action.payload;

      return {
        ...state,
        boardCoordinates: {
          x: node.offsetLeft,
          y: node.offsetTop,
        },
      };
    }

    case SET_BLANK_CELL_COORDINATES: {
      const { node } = action.payload;

      return {
        ...state,
        blankCellCoordinates: {
          x: node.offsetLeft,
          y: node.offsetTop,
        },
      };
    }

    case REORDER_CELLS: {
      const { cellIndex } = action.payload;
      const { cells } = state;
      const newCells = cells.slice();
      const blankIndex = newCells.findIndex((item) => item === 0);
      const removed = newCells.splice(cellIndex, 1, 0);
      newCells.splice(blankIndex, 1, removed[0]);

      return {
        ...state,
        cells: newCells,
      };
    }

    case CHECK_FOR_WIN: {
      const { cells } = state;
      const cellsString = JSON.stringify(cells);
      const win1Sting = JSON.stringify(winCase1);
      const win2Sting = JSON.stringify(winCase2);

      return {
        ...state,
        isWin: cellsString === win1Sting || cellsString === win2Sting,
      };
    }

    case INCREMENT_MOVES: {
      const { moves } = state;

      return {
        ...state,
        moves: moves + 1,
      };
    }

    default:
      return state;
  }
}
