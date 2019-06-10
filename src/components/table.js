/*
NOTE: diamondPositions and hintPositions is an object. Where 
key is the position of diamond on the board and value is any truthy value.
*/

import React, { Component } from "react";
import { generateDiamondSweeperBoard } from "../utils/helper";
import { generateRandomDiamondPositions } from "../utils/helper";
import { generateHintPosition } from "../utils/helper";
const uuidv4 = require("uuid/v4");

export default class Table extends Component {
  state = {
    sweeperBoard: generateDiamondSweeperBoard(64),
    diamondPositions: generateRandomDiamondPositions(64, 8),
    hintPositions: {},
    foundDiamondPosition: [],
    noOfCellsLeftUnturned: [],
    isGameOver: false
  };

  componentDidMount() {
    const hintPositions = generateHintPosition(this.state.diamondPositions);

    const sweeperBoard = this.state.sweeperBoard.map(item => {
      // mark diamond position in sweeperBoard
      if (this.state.diamondPositions[item.id]) {
        item.isDiamond = true;
      }
      return item;
    });

    this.setState({ sweeperBoard, hintPositions });
  }

  onItemClick = (e, d) => {
    const sweeperBoard = this.state.sweeperBoard.map(item => {
      if (item.id === d) {
        item.isClicked = true;
        if (this.state.hintPositions[d]) {
          item.isHint = true;
        }
      } else {
        // this will hide previous shown hint
        item.isHint = false;
      }
      return item;
    });

    // no. of diamonds discovered in the board
    const foundDiamondPosition = sweeperBoard.filter(
      item => item.isClicked === true && item.isDiamond === true
    );

    if (foundDiamondPosition.length === 8) {
      const isGameOver = true;
      const noOfCellsLeftUnturned = sweeperBoard.filter(
        item => item.isClicked === false
      );
      this.setState({
        sweeperBoard,
        foundDiamondPosition,
        isGameOver,
        noOfCellsLeftUnturned
      });
    } else {
      this.setState({ sweeperBoard, foundDiamondPosition });
    }
  };

  resetGame = () => {
    const diamondPositions = generateRandomDiamondPositions(64, 8);
    const foundDiamondPosition = [];
    const noOfCellsLeftUnturned = [];
    const isGameOver = false;
    const hintPositions = generateHintPosition(diamondPositions);

    const sweeperBoard = generateDiamondSweeperBoard(64).map(item => {
      // mark diamond position in sweeperBoard
      if (diamondPositions[item.id]) {
        item.isDiamond = true;
      }
      return item;
    });

    this.setState({
      sweeperBoard,
      diamondPositions,
      foundDiamondPosition,
      noOfCellsLeftUnturned,
      isGameOver,
      hintPositions
    });
  };

  render() {
    let sweeperCells = [];
    this.state.sweeperBoard.forEach((item, i) => {
      let getClass = "cell";
      if (item.isClicked) {
        if (item.isDiamond) {
          getClass = "cell diamond";
        } else if (item.isHint) {
          getClass = "cell arrow";
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
              i += 1; // cell position starts from 1
              this.onItemClick(e, i);
            }}
          />
        </td>
      );
    });

    let rows = [];
    let cells = [];

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

    let sweeperRows = rows.map((d, i) => {
      return <tr key={uuidv4()}>{d}</tr>;
    });

    return (
      <div>
        <div className="ui secondary menu">
          <a className="item" href="#">
            Diamond Sweeper
          </a>
        </div>
        <div className="ui grid container">
          <div className="three stackable column">
            <div className="column" />
            <div className="column">
              <div className="sweeper-container">
                <table
                  className="ui fixed table unstackable diamondsweeper-board"
                  id={this.state.isGameOver ? "game-over" : ""}
                >
                  <tbody>{sweeperRows}</tbody>
                </table>
                {this.state.isGameOver ? (
                  <div className="ui card">
                    <h2 className="title-text">Game Over</h2>
                    <h4 className="card-text">
                      Your total socre is{" "}
                      {this.state.noOfCellsLeftUnturned.length}, which is number
                      of cells that is still left unturned.
                    </h4>
                    <div className="text-center">
                      <button
                        className="ui blue basic button"
                        onClick={this.resetGame}
                      >
                        Reset Game
                      </button>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div className="column" />
          </div>
        </div>
      </div>
    );
  }
}
