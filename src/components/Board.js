import React, { Component } from "react";
import { connect } from "react-redux";
import { setBoardCoordinates, shuffleCells } from "../redux/actions";
import Cell from "./Cell";
import styles from "./Board.module.css";


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
      <>
        <h1>Fifteen Game</h1>
        <div className={styles.board} ref={this.boardRef}>
          {cells.map((value, index) => {
            return (
              <Cell
                key={`${index}_${value}`}
                value={value}
                index={index}
              />
            );
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    cells: state.game.cells
  }
}

export default connect(mapStateToProps, { setBoardCoordinates, shuffleCells })(Board);
