import {
  SHUFFLE_CELLS,
  SET_BOARD_COORDINATES,
  SET_BLANK_CELL_COORDINATES,
  REORDER_CELLS,
  CHECK_FOR_WIN,
  INCREMENT_MOVES,
} from "../actions/actionTypes";

const initialState = {
  cells: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
  boardCoordinates: {
    x: null,
    y: null,
  },
  blankCellCoordinates: {
    x: null,
    y: null,
  },
  isWin: null,
  moves: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHUFFLE_CELLS: {
      const { cells } = state;
      cells.sort(() => Math.random() - 0.5);
      const newCells = cells.slice();
      
      return {
        ...state,
        cells: newCells,
        isWin: false,
        moves: 0
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
      let blankIndex = cells.findIndex(item => item === 0);
      const removed = cells.splice(cellIndex, 1, 0);
      cells.splice(blankIndex, 1, removed[0]);
      const newCells = cells.slice();

      return {
        ...state,
        cells: newCells,
      };
    }

    case CHECK_FOR_WIN: {
      const winArray1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      const winArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
      const { cells } = state;

      if (
        JSON.stringify(cells) === JSON.stringify(winArray1) ||
        JSON.stringify(cells) === JSON.stringify(winArray2)
      ) {
        return {
          ...state,
          isWin: true,
        };
      }

      return {
        ...state,
      };
    }

    case INCREMENT_MOVES: {
      let { moves } = state;
      moves++
      
      return {
        ...state,
        moves
      };
    }

    default:
      return state;
  }
}
