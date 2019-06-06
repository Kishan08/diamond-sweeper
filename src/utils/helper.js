export const generateDiamondSweeperBoard = (noOfCells = 64) => {
  const sweeperBoard = [];
  for (let i = 1; i <= noOfCells; i++) {
    let tmpObj = {};
    tmpObj.id = i;
    tmpObj.isClicked = false;
    tmpObj.isDiamond = false;
    tmpObj.isHint = false;
    sweeperBoard.push(tmpObj);
  }
  return sweeperBoard;
};

export const generateRandomDiamondPositions = (
  noOfCells = 64,
  noOfDiamonds = 8
) => {
  const diamondPositions = {};
  for (let i = 1; i <= noOfCells; i++) {
    let randomNumber = Math.floor(Math.random() * noOfCells);
    if (
      Object.keys(diamondPositions).length < noOfDiamonds &&
      !diamondPositions[randomNumber] &&
      randomNumber > 0
    ) {
      diamondPositions[randomNumber] = true;
    }
  }
  return diamondPositions;
};
