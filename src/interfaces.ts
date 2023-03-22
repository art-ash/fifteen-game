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

export interface IDragStyle {
  top: number;
  left: number;
  zIndex?: number;
  backgroundColor?: string;
  cursor?: string;
}
