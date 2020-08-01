import { connect } from "react-redux";
import { shuffleCells } from "../actions/actions";
import App from "../components/App";

const mapStateToProps = state => {
  return {
    isWin: state.game.isWin
  }
}

export default connect(mapStateToProps, { shuffleCells })(App);
