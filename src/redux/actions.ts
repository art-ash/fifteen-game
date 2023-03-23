import * as types from "./types";

export const setBoardCoordinates = (node: HTMLElement) => ({
  type: types.SET_COORDINATES_BOARD,
  payload: node,
});

export const setBlankCellCoordinates = (node: HTMLElement) => ({
  type: types.SET_COORDINATES_BLANKCELL,
  payload: node,
});

export const shuffleCells = () => ({ type: types.CELLS_SHUFFLE });

export const reorderCells = (index: number) => ({
  type: types.CELLS_REORDER,
  payload: index,
});
