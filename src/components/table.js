import React, { Component } from "react";
const uuidv4 = require("uuid/v4");

export default class Table extends Component {
  state = {
    diamondPositions: [],
    sweeperBoard: []
  };

  componentDidMount() {
    const diamondPositions = [];
    for (let i = 1; i <= 64; i++) {
      let randomNumber = Math.floor(Math.random() * 64);
      if (
        diamondPositions.length !== 8 &&
        !diamondPositions.includes(randomNumber) &&
        randomNumber > 0
      ) {
        diamondPositions.push(randomNumber);
      }
    }

    const sweeperBoard = [];
    for (let i = 1; i <= 64; i++) {
      let tmpObj = {};
      tmpObj.id = i;
      tmpObj.isClicked = false;
      tmpObj.isDiamond = false;
      sweeperBoard.push(tmpObj);
    }
    this.setState({ diamondPositions, sweeperBoard });
  }

  onItemClick = (e, d) => {
    console.log(d);
    const sweeperBoard = this.state.sweeperBoard.map(item => {
      if (item.id === d) {
        item.isClicked = true;
      }
      if (this.state.diamondPositions.includes(item.id)) {
        item.isDiamond = true;
      }
      return item;
    });
    this.setState({ sweeperBoard });
  };

  render() {
    console.log(this.state.diamondPositions);
    // console.log(this.state.sweeperBoard);
    let sweeperCells = [];
    this.state.sweeperBoard.forEach((item, i) => {
      let getClass = "cell";
      if (item.isClicked) {
        if (item.isDiamond) {
          getClass = "cell diamond";
        } else {
          getClass = "cell";
        }
      } else {
        getClass = "cell unknown";
      }
      sweeperCells.push(
        <td key={uuidv4()}>
          <div
            className={getClass}
            onClick={e => {
              i += 1;
              this.onItemClick(e, i);
            }}
          />
        </td>
      );
    });

    let rows = [];
    let cells = [];
    // console.log(`final length: ${sweeperCells.length}`);
    for (let i = 0; i <= sweeperCells.length; i++) {
      if (i % 8 !== 0) {
        cells.push(sweeperCells[i]);
      } else {
        // push cells to rows
        rows.push(cells);
        cells = [];
        //push current item
        cells.push(sweeperCells[i]);
      }
    }
    // sweeperCells.forEach((item, i) => {
    //   // if i mod 8 not equal to 0 push to cells
    //   if (i % 8 !== 0) {
    //     cells.push(item);
    //   } else {
    //     // push cells to rows
    //     rows.push(cells);
    //     cells = [];
    //     //push current item
    //     cells.push(item);
    //   }
    // });
    // console.log(`final row length: ${rows.length}`);
    // console.log(rows);
    let sweeperRows = rows.map((d, i) => {
      return <tr key={uuidv4()}>{d}</tr>;
    });

    return (
      <div>
        <div className="App">
          <table className="diamondsweeper-board">
            <tbody>{sweeperRows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
