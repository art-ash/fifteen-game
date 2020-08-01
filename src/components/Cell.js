import React, { Component } from "react";
import styles from "./Cell.module.css";

const CELL_SIZE = 100;
const DRAGGING_STYLE = {
  zIndex: 10,
  backgroundColor: "#000",
};

class Cell extends Component {
  constructor(props) {
    super(props);
    this.squareRef = React.createRef();
    this.state = {
      draggingStyle: null,
      isCellClicked: null,
      isCellBlank: false,
      isCellDraggable: false,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.isCellDraggable = this.isCellDraggable.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    const isCellBlank = value === 0;

    if (isCellBlank) {
      const squareRef = this.squareRef.current;
      this.props.setBlankCellCoordinates(squareRef);
      this.setState({ isCellBlank });
    }

    if (this.isCellDraggable()) {
      this.setState({ isCellDraggable: true });
    }
  }

  isCellDraggable() {
    const { cells, index } = this.props;
    let blankIndex = cells.findIndex(item => item === 0);
    blankIndex = blankIndex + 5;
    const squareIndex = index + 5;

    if (
      squareIndex === blankIndex + 1 ||
      squareIndex === blankIndex - 1 ||
      squareIndex === blankIndex + 4 ||
      squareIndex === blankIndex - 4
    ) {
      return true;
    }
  }

  handleMouseDown(e) {
    const { boardCoordinates } = this.props;

    this.setState({
      isCellClicked: true,
      draggingStyle: {
        top: e.pageY - boardCoordinates.y - CELL_SIZE / 2,
        left: e.pageX - boardCoordinates.x - CELL_SIZE / 2,
        ...DRAGGING_STYLE,
      },
    });
  }

  handleMouseMove(e) {
    const { boardCoordinates } = this.props;

    this.setState({
      draggingStyle: {
        top: e.pageY - boardCoordinates.y - CELL_SIZE / 2,
        left: e.pageX - boardCoordinates.x - CELL_SIZE / 2,
        ...DRAGGING_STYLE,
      },
    });
  }

  handleMouseUp(e) {
    const { blankCellCoordinates, boardCoordinates, index } = this.props;

    if (
      e.clientX > blankCellCoordinates.x + boardCoordinates.x &&
      e.clientX < blankCellCoordinates.x + boardCoordinates.x + CELL_SIZE * 2 &&
      e.clientY > blankCellCoordinates.y + boardCoordinates.y &&
      e.clientY < blankCellCoordinates.y + boardCoordinates.y + CELL_SIZE * 2
    ) {
      this.setState({
        isCellClicked: null,
        draggingStyle: null,
      });
      this.props.reorderCells(index);
      this.props.checkForWin();
    }
  }

  render() {
    const { value } = this.props;
    const { draggingStyle, isCellClicked, isCellBlank } = this.state;
    const isCellDraggable = this.state;

    if (isCellBlank) {
      return <div className={styles.cell} />;
    }

    return (
      <div
        style={draggingStyle}
        className={styles.cell}
        onMouseDown={isCellDraggable ? this.handleMouseDown : null}
        onMouseMove={isCellClicked ? this.handleMouseMove : null}
        onMouseUp={isCellClicked ? this.handleMouseUp : null}
        ref={this.squareRef}
      >
        {value}
      </div>
    );
  }
}

export default Cell;
