import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setBlankCellCoordinates, reorderCells } from "../redux/actions";
import { IState, CellProps } from "../interfaces";

const CELLSIZE = 80;

const Cell: React.FC<CellProps> = (props) => {
  const {
    value,
    index,
    canDrag,
    board,
    blankCell,
    setBlankCellCoordinates,
    reorderCells,
  } = props;

  const [draggingStyle, setDraggingStyle] = useState<React.CSSProperties>({});
  const [touched, setTouched] = useState<Boolean>(false);
  const [moved, setMoved] = useState<Boolean>(false);
  const [blank, setBlank] = useState<Boolean>(false);

  const cellRef = useRef(null);

  useEffect(() => {
    if (cellRef.current && value === 0) {
      setBlank(true);
      setBlankCellCoordinates(cellRef.current);
    }
  }, [cellRef.current]);

  const move = (x: number, y: number) => {
    if (touched) {
      setMoved(true);
      setDraggingStyle({
        top: y - board.y - CELLSIZE / 2,
        left: x - board.x - CELLSIZE / 2,
        zIndex: 10,
        backgroundColor: "#111",
      });
    }
  };

  const end = (x: number, y: number) => {
    if (moved) {
      if (
        x > blankCell.x + board.x &&
        x < blankCell.x + board.x + CELLSIZE * 2 &&
        y > blankCell.y + board.y &&
        y < blankCell.y + board.y + CELLSIZE * 2
      ) {
        reorderCells(index);
        setTouched(false);
        setMoved(false);
        setDraggingStyle({});
      }
    }
  };

  if (blank) {
    return <div className="cell" />;
  }

  return (
    <div
      ref={cellRef}
      style={canDrag ? { ...draggingStyle, cursor: "move" } : {}}
      className="cell"
      onMouseDown={() => canDrag && setTouched(true)}
      onMouseMove={(e) => touched && move(e.pageX, e.pageY)}
      onMouseUp={(e) => moved && end(e.pageX, e.pageY)}
      onTouchStart={() => canDrag && setTouched(true)}
      onTouchMove={(e) =>
        touched && move(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
      }
      onTouchEnd={(e) =>
        moved && end(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
      }
    >
      {value}
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { cells, board, blankCell } = state;

  return {
    cells,
    board,
    blankCell,
  };
};

export default connect(mapStateToProps, {
  setBlankCellCoordinates,
  reorderCells,
})(Cell);
