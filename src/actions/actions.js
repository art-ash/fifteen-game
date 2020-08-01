import {
  SHUFFLE_CELLS,
  SET_BLANK_CELL_COORDINATES,
  SET_BOARD_COORDINATES,
  REORDER_CELLS,
  CHECK_FOR_WIN,
  INCREMENT_MOVES,
} from "./actionTypes";

export const shuffleCells = () => ({ type: SHUFFLE_CELLS });

export const setBlankCellCoordinates = node => ({
  type: SET_BLANK_CELL_COORDINATES,
  payload: { node },
});

export const setBoardCoordinates = node => ({
  type: SET_BOARD_COORDINATES,
  payload: { node },
});

export const reorderCells = cellIndex => ({
  type: REORDER_CELLS,
  payload: { cellIndex },
});

export const checkForWin = () => ({ type: CHECK_FOR_WIN });

export const incrementMoves = () => ({ type: INCREMENT_MOVES });