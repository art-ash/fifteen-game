import React, { Component } from "react";
import Cell from "../containers/Cell";
import styles from "./Board.module.css";

class Board extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    this.isCellDraggable = this.isCellDraggable.bind(this);
  }

  componentDidMount() {
    this.props.shuffleCells();
    const boardRef = this.boardRef.current;
    this.props.setBoardCoordinates(boardRef);
  }

  isCellDraggable(index) {
    const { cells } = this.props;
    let blankIndex = cells.findIndex(item => item === 0);
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
  }

  render() {
    const { cells } = this.props;

    return (
      <div className={styles.board} ref={this.boardRef}>
        {cells.map((value, index) => (
          <Cell
            key={`${index}_${value}`}
            value={value}
            index={index}
            isCellDraggable={this.isCellDraggable(index)}
          />
        ))}
      </div>
    );
  }
}

export default Board;
