import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setBoardCoordinates, shuffleCells } from "../actions/actions";
import Cell from "./Cell";
import { IState } from "../interfaces";

const Board = (props: any) => {
  const { cells, setBoardCoordinates, shuffleCells } = props;

  const boardRef = useRef(null);

  useEffect(() => {
    shuffleCells();
    setBoardCoordinates(boardRef.current);
  }, []);

  const canDrag = (index: number): boolean => {
    let blankIndex = cells.findIndex((item: number) => item === 0);
    blankIndex = blankIndex + 5;
    const squareIndex = index + 5;

    if (
      squareIndex === blankIndex + 1 ||
      squareIndex === blankIndex - 1 ||
      squareIndex === blankIndex + 4 ||
      squareIndex === blankIndex - 4
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="board" ref={boardRef}>
      {cells.map((value: number, index: number) => (
        <Cell
          key={`${index}_${value}`}
          value={value}
          index={index}
          canDrag={canDrag(index)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  cells: state.cells,
});

export default connect(mapStateToProps, { setBoardCoordinates, shuffleCells })(
  Board
);
