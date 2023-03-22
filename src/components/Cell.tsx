import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  setBlankCellCoordinates,
  reorderCells,
  checkForWin,
  incrementMoves,
} from "../actions/actions";
import { IState, IDragStyle } from "../interfaces";

const CELLSIZE = 80;
const DRAGSTYLE = {
  zIndex: 10,
  backgroundColor: "#111",
};

const Cell = (props: any) => {
  const {
    value,
    index,
    boardCoordinates,
    blankCellCoordinates,
    setBlankCellCoordinates,
    reorderCells,
    incrementMoves,
    checkForWin,
    canDrag,
  } = props;

  const [draggingStyle, setDraggingStyle] = useState<IDragStyle | object>({});
  const [isCellClicked, setIsCellClicked] = useState<Boolean>(false);
  const [isCellMoved, setIsCellMoved] = useState<Boolean>(false);
  const [isCellBlank, setIsCellBlank] = useState<Boolean>(false);

  const squareRef = useRef(null);

  useEffect(() => {
    const isCellBlank = value === 0;
    if (isCellBlank) {
      setBlankCellCoordinates(squareRef.current);
      setIsCellBlank(isCellBlank);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (canDrag) {
      setIsCellClicked(true);
      setDraggingStyle({
        top: e.pageY - boardCoordinates.y - CELLSIZE / 2,
        left: e.pageX - boardCoordinates.x - CELLSIZE / 2,
        ...DRAGSTYLE,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (canDrag && isCellClicked) {
      setIsCellMoved(true);
      setDraggingStyle({
        top: e.pageY - boardCoordinates.y - CELLSIZE / 2,
        left: e.pageX - boardCoordinates.x - CELLSIZE / 2,
        ...DRAGSTYLE,
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (canDrag && isCellMoved) {
      if (
        e.clientX > blankCellCoordinates.x + boardCoordinates.x &&
        e.clientX <
          blankCellCoordinates.x + boardCoordinates.x + CELLSIZE * 2 &&
        e.clientY > blankCellCoordinates.y + boardCoordinates.y &&
        e.clientY < blankCellCoordinates.y + boardCoordinates.y + CELLSIZE * 2
      ) {
        reorderCells(index);
        incrementMoves();
        checkForWin();
        setIsCellClicked(false);
        setIsCellMoved(false);
        setDraggingStyle({});
      }
    }
  };

  if (isCellBlank) {
    return <div className="cell" />;
  }

  return (
    <div
      ref={squareRef}
      style={
        canDrag ? { ...draggingStyle, cursor: "move" } : draggingStyle
      }
      className="cell"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {value}
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { cells, boardCoordinates, blankCellCoordinates } = state;

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
