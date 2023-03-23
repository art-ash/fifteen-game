import React from "react";
import { connect } from "react-redux";
import { shuffleCells } from "../redux/actions";
import Board from "./Board";
import { IState, AppProps } from "../interfaces";

const App: React.FC<AppProps> = (props) => {
  const { isWin, moves, shuffleCells } = props;

  return (
    <div className="app">
      <h1>Fifteen Game</h1>
      <p>Moves: {moves}</p>
      {isWin ? <h2>You Won!</h2> : <Board />}
      <button className="button" onClick={() => shuffleCells()}>
        {isWin ? "Play again!" : "Shuffle Cells"}
      </button>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  isWin: state.isWin,
  moves: state.moves,
});

export default connect(mapStateToProps, { shuffleCells })(App);
