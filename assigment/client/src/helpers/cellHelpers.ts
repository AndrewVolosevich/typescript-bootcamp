import {Cell} from "../types/game";

export const getSortedCells = (arr: Cell[], maxIndex?: string, minIndex?: string) => {
  const filteredArr = arr.filter(cell => cell.value !== 0)
  if (maxIndex && minIndex) {
    return filteredArr.slice()
        .slice().sort((a, b) => {
          return b[maxIndex] - a[maxIndex]
        })
        .slice().sort((a, b) => {
          return a[minIndex] - b[minIndex]
        })
  }
  return filteredArr
}

export const compareCellsCoords = (cell1: Cell, cell2: Cell) => {
  return cell1.x === cell2.x &&
    cell1.y === cell2.y &&
    cell1.z === cell2.z;
}

export const getCellIdx = (grid: Cell[], cell: Cell) => {
  return grid.findIndex(c => {
    if (compareCellsCoords(c, cell)) {
      return c
    } else {}
    return false
  })
}

export const isCellExist = (grid: Cell[], cell: Cell) => {
  return getCellIdx(grid, cell) !== -1
}