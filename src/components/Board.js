import React, { Component } from "react";
import Cell from "../containers/Cell";
import styles from "./Board.module.css";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.boardRef = React.createRef();
  }

  componentDidMount() {
    this.props.shuffleCells();
    const boardRef = this.boardRef.current;
    this.props.setBoardCoordinates(boardRef);
  }

  render() {
    const { cells } = this.props;

    return (
      <div className={styles.board} ref={this.boardRef}>
        {cells.map((value, index) => {
          return <Cell key={`${index}_${value}`} value={value} index={index} />;
        })}
      </div>
    );
  }
}

export default Board;
