import React, { Component } from "react";
import Board from "../containers/Board";
import styles from "./App.module.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.props.shuffleCells();
  }

  render() {
    const { isWin } = this.props;
    let content;

    if (isWin) {
      content = <h2>You Win!</h2>
    } else {
      content = <Board />
    }

    return (
      <div className={styles.app}>
        <h1>Fifteen Game</h1>
        {content}
        <button className={styles.button} onClick={this.handleButtonClick}>
          {isWin ? 'Play again!' : 'Shuffle Cells'}
        </button>
      </div>
    );
  }
}

export default App;