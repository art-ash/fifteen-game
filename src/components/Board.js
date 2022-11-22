import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setBoardCoordinates, shuffleCells } from "../actions/actions";
import Cell from "./Cell";

const Board = ({ cells, setBoardCoordinates, shuffleCells }) => {
  const boardRef = useRef(null);

  useEffect(() => {
    shuffleCells();
    setBoardCoordinates(boardRef.current);
  }, []);

  const isCellDraggable = (index) => {
    let blankIndex = cells.findIndex((item) => item === 0);
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
      {cells.map((value, index) => (
        <Cell
          key={`${index}_${value}`}
          value={value}
          index={index}
          isCellDraggable={isCellDraggable(index)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cells: state.game.cells,
});

export default connect(mapStateToProps, { setBoardCoordinates, shuffleCells })(
  Board
);
