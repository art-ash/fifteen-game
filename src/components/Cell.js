import React, { Component } from "react";
import styles from "./Cell.module.css";

const CELL_SIZE = 100;
const DRAGGING_STYLE = {
  zIndex: 10,
  backgroundColor: "#111",
};

class Cell extends Component {
  constructor(props) {
    super(props);
    this.squareRef = React.createRef();
    this.state = {
      draggingStyle: null,
      isCellClicked: null,
      isCellMoved: null,
      isCellBlank: false,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    const isCellBlank = value === 0;
    if (isCellBlank) {
      const squareRef = this.squareRef.current;
      this.props.setBlankCellCoordinates(squareRef);
      this.setState({ isCellBlank });
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
      isCellMoved: true,
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
      this.props.reorderCells(index);
      this.props.checkForWin();
      this.setState({
        isCellClicked: false,
        isCellMoved: false,
        draggingStyle: null,
      });
    }
  }

  render() {
    const { value, isCellDraggable } = this.props;
    const {
      draggingStyle,
      isCellClicked,
      isCellMoved,
      isCellBlank,
    } = this.state;

    if (isCellBlank) {
      return <div className={styles.cell} />;
    }

    return (
      <div
        style={draggingStyle}
        className={styles.cell}
        onMouseDown={isCellDraggable ? this.handleMouseDown : null}
        onMouseMove={
          isCellDraggable && isCellClicked ? this.handleMouseMove : null
        }
        onMouseUp={isCellDraggable && isCellMoved ? this.handleMouseUp : null}
        ref={this.squareRef}
      >
        {value}
      </div>
    );
  }
}

export default Cell;
