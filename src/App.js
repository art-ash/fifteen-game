import React, { Component } from "react";
import Cell from "./Cell";
import styles from "./App.module.css";

const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

class App extends Component {
  constructor() {
    super();
    this.state = {
      cells: this.shuffle(cells),
      blankCoords: {
        x: null,
        y: null,
      },
      boardCoords: {
        x: null,
        y: null,
      },
      isWin: null,
    };
    this.boardRef = React.createRef();
    this.setBlankCoords = this.setBlankCoords.bind(this);
    this.reorder = this.reorder.bind(this);
    this.checkIfWin = this.checkIfWin.bind(this);
  }

  componentDidMount() {
    const boardRef = this.boardRef.current;
    this.setState({
      boardCoords: {
        x: boardRef.offsetLeft,
        y: boardRef.offsetTop,
      },
    });
  }

  setBlankCoords(blankRef) {
    this.setState({
      blankCoords: {
        x: blankRef.offsetLeft,
        y: blankRef.offsetTop,
      },
    });
  }

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  reorder(index) {
    const { cells } = this.state;
    let blankIndex = cells.findIndex(item => item === 0);
    const removed = cells.splice(index, 1, 0);
    cells.splice(blankIndex, 1, removed[0]);
    this.setState({ cells }, () => this.checkIfWin());
  }

  checkIfWin() {
    const winArray1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const winArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    const { cells } = this.state;

    if (
      JSON.stringify(cells) == JSON.stringify(winArray1) ||
      JSON.stringify(cells) == JSON.stringify(winArray2)
    ) {
      this.setState({
        isWin: true,
      });
    }
  }

  render() {
    const { cells, blankCoords, boardCoords, isWin } = this.state;

    if (isWin) {
      return (
        <div className={styles.app}>
          <h1>You Win!</h1>
        </div>
      );
    }

    return (
      <div className={styles.app}>
        <h1>Fifteen Game</h1>
        <div className={styles.board} ref={this.boardRef}>
          {cells.map((value, index) => {
            return (
              <Cell
                cells={cells}
                key={`${index}${value}`}
                value={value}
                index={index}
                setBlankCoords={this.setBlankCoords}
                blankCoords={blankCoords}
                boardCoords={boardCoords}
                reorder={this.reorder}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
