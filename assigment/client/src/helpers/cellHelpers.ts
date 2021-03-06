import {Cell} from "../types/game";

export const getSortCells = (arr: Cell[], cellIndex: string) => {

  const filteredArr = arr.filter(cell => cell.value !== 0)
  return filteredArr.slice().sort((a, b) => {
    return b[cellIndex] - a[cellIndex]
  })
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
    }
  })
}

export const isCellExist = (grid: Cell[], cell: Cell) => {
  return getCellIdx(grid, cell) !== -1
}