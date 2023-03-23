import { Action } from "redux";
export interface AppProps {
  isWin: boolean;
  moves: number;
  shuffleCells: () => Action;
}

export interface BoardProps {
  cells: number[];
  setBoardCoordinates: (node: HTMLElement) => Action;
  shuffleCells: () => Action;
}

export interface CellProps {
  value: number;
  index: number;
  boardCoordinates: ICoordinates;
  blankCellCoordinates: ICoordinates;
  canDrag: boolean;
  setBlankCellCoordinates: (node: HTMLElement) => Action;
  reorderCells: (cellIndex: number) => Action;
  incrementMoves: () => Action;
  checkForWin: () => Action;
}

export interface ICoordinates {
  x: number | null;
  y: number | null;
}

export interface IState {
  cells: number[];
  boardCoordinates: ICoordinates;
  blankCellCoordinates: ICoordinates;
  isWin: boolean;
  moves: number;
}

export interface IAction {
  type: string;
  payload?: any;
}
