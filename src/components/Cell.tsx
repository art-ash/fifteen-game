import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  setBlankCellCoordinates,
  reorderCells,
  checkForWin,
  incrementMoves,
} from "../redux/actions";
import { IState } from "../interfaces";

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

  const [draggingStyle, setDraggingStyle] = useState<React.CSSProperties>({});
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

  const start = (x: number, y: number) => {
    if (canDrag) {
      setIsCellClicked(true);
      setDraggingStyle({
        top: y - boardCoordinates.y - CELLSIZE / 2,
        left: x - boardCoordinates.x - CELLSIZE / 2,
        ...DRAGSTYLE,
      });
    }
  };

  const move = (x: number, y: number) => {
    if (canDrag && isCellClicked) {
      setIsCellMoved(true);
      setDraggingStyle({
        top: y - boardCoordinates.y - CELLSIZE / 2,
        left: x - boardCoordinates.x - CELLSIZE / 2,
        ...DRAGSTYLE,
      });
    }
  };

  const end = (x: number, y: number) => {
    if (canDrag && isCellMoved) {
      if (
        x > blankCellCoordinates.x + boardCoordinates.x &&
        x < blankCellCoordinates.x + boardCoordinates.x + CELLSIZE * 2 &&
        y > blankCellCoordinates.y + boardCoordinates.y &&
        y < blankCellCoordinates.y + boardCoordinates.y + CELLSIZE * 2
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (canDrag) {
      start(e.pageX, e.pageY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (canDrag && isCellClicked) {
      move(e.pageX, e.pageY);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (canDrag && isCellMoved) {
      end(e.pageX, e.pageY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (canDrag) {
      start(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (canDrag && isCellClicked) {
      move(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (canDrag && isCellMoved) {
      end(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    }
  };

  if (isCellBlank) {
    return <div className="cell" />;
  }

  return (
    <div
      ref={squareRef}
      style={canDrag ? { ...draggingStyle, cursor: "move" } : draggingStyle}
      className="cell"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
