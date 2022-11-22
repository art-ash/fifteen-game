import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  setBlankCellCoordinates,
  reorderCells,
  checkForWin,
  incrementMoves,
} from "../actions/actions";

const CELL_SIZE = 100;
const DRAGGING_STYLE = {
  zIndex: 10,
  backgroundColor: "#111",
};

const Cell = (props) => {
  const {
    value,
    index,
    boardCoordinates,
    blankCellCoordinates,
    setBlankCellCoordinates,
    reorderCells,
    incrementMoves,
    checkForWin,
    isCellDraggable,
  } = props;

  const [draggingStyle, setDraggingStyle] = useState(null);
  const [isCellClicked, setIsCellClicked] = useState(null);
  const [isCellMoved, setIsCellMoved] = useState(null);
  const [isCellBlank, setIsCellBlank] = useState(false);

  const squareRef = useRef(null);

  useEffect(() => {
    const isCellBlank = value === 0;
    if (isCellBlank) {
      setBlankCellCoordinates(squareRef.current);
      setIsCellBlank(isCellBlank);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsCellClicked(true);
    setDraggingStyle({
      top: e.pageY - boardCoordinates.y - CELL_SIZE / 2,
      left: e.pageX - boardCoordinates.x - CELL_SIZE / 2,
      ...DRAGGING_STYLE,
    });
  };

  const handleMouseMove = (e) => {
    setIsCellMoved(true);
    setDraggingStyle({
      top: e.pageY - boardCoordinates.y - CELL_SIZE / 2,
      left: e.pageX - boardCoordinates.x - CELL_SIZE / 2,
      ...DRAGGING_STYLE,
    });
  };

  const handleMouseUp = (e) => {
    if (
      e.clientX > blankCellCoordinates.x + boardCoordinates.x &&
      e.clientX < blankCellCoordinates.x + boardCoordinates.x + CELL_SIZE * 2 &&
      e.clientY > blankCellCoordinates.y + boardCoordinates.y &&
      e.clientY < blankCellCoordinates.y + boardCoordinates.y + CELL_SIZE * 2
    ) {
      reorderCells(index);
      incrementMoves();
      checkForWin();
      setIsCellClicked(false);
      setIsCellMoved(false);
      setDraggingStyle(null);
    }
  };

  if (isCellBlank) {
    return <div className="cell" />;
  }

  return (
    <div
      ref={squareRef}
      style={
        isCellDraggable ? { ...draggingStyle, cursor: "move" } : draggingStyle
      }
      className="cell"
      onMouseDown={isCellDraggable ? handleMouseDown : null}
      onMouseMove={isCellDraggable && isCellClicked ? handleMouseMove : null}
      onMouseUp={isCellDraggable && isCellMoved ? handleMouseUp : null}
    >
      {value}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { cells, boardCoordinates, blankCellCoordinates } = state.game;

  return {
    cells,
    boardCoordinates,
    blankCellCoordinates,
  };
};

export default connect(mapStateToProps, {
  setBlankCellCoordinates,
  reorderCells,
  checkForWin,
  incrementMoves,
})(Cell);
