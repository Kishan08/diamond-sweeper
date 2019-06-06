export const generateDiamondSweeperBoard = (noOfCells = 64) => {
  const sweeperBoard = [];
  for (let i = 1; i <= noOfCells; i++) {
    let tmpObj = {};
    tmpObj.id = i;
    tmpObj.isClicked = false;
    tmpObj.isDiamond = false;
    sweeperBoard.push(tmpObj);
  }
  return sweeperBoard;
};

export const generateRandomDiamondPositions = (
  noOfCells = 64,
  noOfDiamonds = 8
) => {
  const diamondPositions = [];
  for (let i = 1; i <= noOfCells; i++) {
    let randomNumber = Math.floor(Math.random() * noOfCells);
    if (
      diamondPositions.length !== noOfDiamonds &&
      !diamondPositions.includes(randomNumber) &&
      randomNumber > 0
    ) {
      diamondPositions.push(randomNumber);
    }
  }
  return diamondPositions;
};
