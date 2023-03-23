import * as types from "./types";

export const shuffleCells = () => ({ type: types.SHUFFLE_CELLS });

export const setBlankCellCoordinates = (node: HTMLElement) => ({
  type: types.SET_BLANK_CELL_COORDINATES,
  payload: node,
});

export const setBoardCoordinates = (node: HTMLElement) => ({
  type: types.SET_BOARD_COORDINATES,
  payload: node,
});

export const reorderCells = (cellIndex: number) => ({
  type: types.REORDER_CELLS,
  payload: cellIndex,
});

export const checkForWin = () => ({ type: types.CHECK_FOR_WIN });

export const incrementMoves = () => ({ type: types.INCREMENT_MOVES });
