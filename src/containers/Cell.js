import { connect } from "react-redux";
import { setBlankCellCoordinates, reorderCells, checkForWin } from "../actions/actions";
import Cell from "../components/Cell";

const mapStateToProps = state => {
  const {cells, boardCoordinates, blankCellCoordinates} = state.game;

  return {
    cells,
    boardCoordinates,
    blankCellCoordinates
  }
}

export default connect(mapStateToProps, { setBlankCellCoordinates, reorderCells, checkForWin })(Cell);
