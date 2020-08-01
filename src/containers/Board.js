import { connect } from "react-redux";
import { setBoardCoordinates, shuffleCells } from "../actions/actions";
import Board from "../components/Board";

const mapStateToProps = state => {
  return {
    cells: state.game.cells
  }
}

export default connect(mapStateToProps, { setBoardCoordinates, shuffleCells })(Board);
