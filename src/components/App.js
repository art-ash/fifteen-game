import React from "react";
import { connect } from "react-redux";
import { shuffleCells } from "../actions/actions";
import Board from "./Board";

const App = ({ isWin, moves, shuffleCells }) => {
  const handleButtonClick = () => {
    shuffleCells();
  };

  return (
    <div className="app">
      <h1>Fifteen Game</h1>
      <p>Moves: {moves}</p>
      {isWin ? <h2>You Won!</h2> : <Board />}
      <button className="button" onClick={handleButtonClick}>
        {isWin ? "Play again!" : "Shuffle Cells"}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isWin: state.game.isWin,
  moves: state.game.moves,
});

export default connect(mapStateToProps, { shuffleCells })(App);
