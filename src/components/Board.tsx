import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setBoardCoordinates, shuffleCells } from "../redux/actions";
import Cell from "./Cell";
import { IState, BoardProps } from "../interfaces";

const Board: React.FC<BoardProps> = ({
  cells,
  setBoardCoordinates,
  shuffleCells,
}) => {
  const boardRef = useRef(null);

  useEffect(() => {
    if (boardRef.current) {
      shuffleCells();
      setBoardCoordinates(boardRef.current);
    }
  }, [boardRef.current]);

  const canDrag = (index: number) => {
    let blankIndex = cells.findIndex((item: number) => item === 0);
    blankIndex = blankIndex + 5;
    const squareIndex = index + 5;

    return (
      squareIndex === blankIndex + 1 ||
      squareIndex === blankIndex - 1 ||
      squareIndex === blankIndex + 4 ||
      squareIndex === blankIndex - 4
    );
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
