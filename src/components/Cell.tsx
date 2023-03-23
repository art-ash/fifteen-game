import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setBlankCellCoordinates, reorderCells } from "../redux/actions";
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

  const handleStart = () => {
    if (canDrag) {
      setIsCellClicked(true);
    }
  };

  const move = (x: number, y: number) => {
    if (isCellClicked) {
      setIsCellMoved(true);
      setDraggingStyle({
        top: y - boardCoordinates.y - CELLSIZE / 2,
        left: x - boardCoordinates.x - CELLSIZE / 2,
        ...DRAGSTYLE,
      });
    }
  };

  const end = (x: number, y: number) => {
    if (isCellMoved) {
      if (
        x > blankCellCoordinates.x + boardCoordinates.x &&
        x < blankCellCoordinates.x + boardCoordinates.x + CELLSIZE * 2 &&
        y > blankCellCoordinates.y + boardCoordinates.y &&
        y < blankCellCoordinates.y + boardCoordinates.y + CELLSIZE * 2
      ) {
        reorderCells(index);
        setIsCellClicked(false);
        setIsCellMoved(false);
        setDraggingStyle({});
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isCellClicked) {
      move(e.pageX, e.pageY);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isCellMoved) {
      end(e.pageX, e.pageY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isCellClicked) {
      move(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isCellMoved) {
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
      onMouseDown={handleStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleStart}
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
})(Cell);
