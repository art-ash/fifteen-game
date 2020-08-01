import React, { Component } from "react";
import { connect } from "react-redux";
import { shuffleCells } from "../redux/actions";
import Board from "./Board";
import styles from "./App.module.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  // checkIfWin() {
  //   const winArray1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  //   const winArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  //   const { cells } = this.state;

  //   if (
  //     JSON.stringify(cells) == JSON.stringify(winArray1) ||
  //     JSON.stringify(cells) == JSON.stringify(winArray2)
  //   ) {
  //     this.setState({
  //       isWin: true,
  //     });
  //   }
  // }

  handlePlayClick() {
    this.props.shuffleCells();
  }

  render() {
    const { isWin } = this.props;

    if (isWin) {
      return (
        <div className={styles.app}>
          <h1>You Win!</h1>
          <button className={styles.playButton} onClick={this.handlePlayClick}>
            Play again!
          </button>
        </div>
      );
    }

    return (
      <div className={styles.app}>
        <Board />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isWin: state.game.isWin
  }
}

export default connect(mapStateToProps, { shuffleCells })(App);
