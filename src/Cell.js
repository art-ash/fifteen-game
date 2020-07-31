import React, { Component } from "react";
import styles from "./Cell.module.css";

const CELL_SIZE = 100;
const DRAGGING_COLORS = {
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
      this.props.setBlankCoords(squareRef);
      this.setState({ isCellBlank });
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
    const { boardCoords } = this.props;

    this.setState({
      isCellClicked: true,
      draggingStyle: {
        top: e.pageY - boardCoords.y - CELL_SIZE / 2,
        left: e.pageX - boardCoords.x - CELL_SIZE / 2,
        ...DRAGGING_COLORS,
      },
    });
  }

  handleMouseMove(e) {
    const { boardCoords } = this.props;

    this.setState({
      draggingStyle: {
        top: e.pageY - boardCoords.y - CELL_SIZE / 2,
        left: e.pageX - boardCoords.x - CELL_SIZE / 2,
        ...DRAGGING_COLORS,
      },
    });
  }

  handleMouseUp(e) {
    const { blankCoords, boardCoords, index } = this.props;

    if (
      e.clientX > blankCoords.x + boardCoords.x &&
      e.clientX < blankCoords.x + boardCoords.x + CELL_SIZE * 2 &&
      e.clientY > blankCoords.y + boardCoords.y &&
      e.clientY < blankCoords.y + boardCoords.y + CELL_SIZE * 2
    ) {
      this.setState({
        isCellClicked: null,
        draggingStyle: null,
      });
      this.props.reorder(index);
    }
  }

  render() {
    const { value } = this.props;
    const { draggingStyle, isCellClicked, isCellBlank } = this.state;
    const isCellDraggable = this.isCellDraggable();

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
