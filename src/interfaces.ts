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
  board: ICoordinates;
  blankCell: ICoordinates;
  canDrag: boolean;
  setBlankCellCoordinates: (node: HTMLElement) => Action;
  reorderCells: (index: number) => Action;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IState {
  cells: number[];
  board: ICoordinates;
  blankCell: ICoordinates;
  isWin: boolean;
  moves: number;
}

export interface IAction {
  type: string;
  payload?: any;
}
