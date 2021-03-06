import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Grid from "../grid";
import styles from './app.module.scss';
import {
  setGridSize,
  setGrid,
  setCell,
  clearCells,
  selectSize, selectGrid,
} from '../../store/features/game/gameSlice';
import api from '../../api/serverApi'
import {gameGrid2, gameGrid3} from "../../moky/gameGrid";
import {getCellIdx, getSortCells, isCellExist} from "../../helpers/cellHelpers";

const keyPressHandler = (event) => {
  // console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`)
}

const App = () => {
  const gridSize = useSelector(selectSize)
  const grid = useSelector(selectGrid)
  const dispatch = useDispatch()

  useEffect(() => {
    api.getStartData(2).then(resp => {
      const addedCells = resp.data
      addedCells.forEach((newCell => {
        dispatch(setCell(newCell))
      }))
    })
  }, [gridSize])

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler)
    return () => {
      document.removeEventListener('keydown', keyPressHandler)
    }
  }, [])

  const moveUpHandler = () => {
    const cellsWithValues = getSortCells(grid, 'x').map(cell => {
      const newCell = {...cell}
      let result = {...cell}

      while (isCellExist(grid, newCell)) {
        newCell.y += 1
        newCell.z -= 1
        if (isCellExist(grid, newCell)) {
          if (grid[getCellIdx(grid, newCell)].value === 0) {
            result = {...newCell}
          }
        }
      }
      return result
    })
    dispatch(clearCells())
    cellsWithValues.forEach(cell => {
      dispatch(setCell(cell))
    })
  }

  const moveDownHandler = () => {
    const cellsWithValues = getSortCells(grid, 'x').map(cell => {
      let newCell = {...cell}
      let result = {...cell}

      while (isCellExist(grid, newCell)) {
        newCell.y -= 1
        newCell.z += 1
        if (isCellExist(grid, newCell)) {
          if (grid[getCellIdx(grid, newCell)].value === 0) {
            result = {...newCell}
          }
        }
      }
      return result
    })
    dispatch(clearCells())
    cellsWithValues.forEach(cell => {
      dispatch(setCell(cell))
    })
  }

  const moveLeftTopHandler = () => {
    const cellsWithValues = getSortCells(grid, 'z').map(cell => {
      let newCell = {...cell}
      let result = {...cell}

      while (isCellExist(grid, newCell)) {
        newCell.x -= 1
        newCell.y += 1
        if (isCellExist(grid, newCell)) {
          if (grid[getCellIdx(grid, newCell)].value === 0) {
            result = {...newCell}
          }
        }
      }
      return result
    })
    dispatch(clearCells())
    cellsWithValues.forEach(cell => {
      dispatch(setCell(cell))
    })
  }

  const moveRightBottomHandler = () => {
    const cellsWithValues = getSortCells(grid, 'z').map(cell => {
      let newCell = {...cell}
      let result = {...cell}

      while (isCellExist(grid, newCell)) {
        newCell.x += 1
        newCell.y -= 1
        if (isCellExist(grid, newCell)) {
          if (grid[getCellIdx(grid, newCell)].value === 0) {
            result = {...newCell}
          }
        }
      }
      return result
    })
    dispatch(clearCells())
    cellsWithValues.forEach(cell => {
      dispatch(setCell(cell))
    })
  }

  const moveLeftBottomHandler = () => {
    const cellsWithValues = getSortCells(grid, 'y').map(cell => {
      let newCell = {...cell}
      let result = {...cell}

      while (isCellExist(grid, newCell)) {
        newCell.x -= 1
        newCell.z += 1
        if (isCellExist(grid, newCell)) {
          if (grid[getCellIdx(grid, newCell)].value === 0) {
            result = {...newCell}
          }
        }
      }
      return result
    })
    dispatch(clearCells())
    cellsWithValues.forEach(cell => {
      dispatch(setCell(cell))
    })
  }

  const moveRightTopHandler = () => {
    const cellsWithValues = getSortCells(grid, 'y').map(cell => {
      let newCell = {...cell}
      let result = {...cell}

      while (isCellExist(grid, newCell)) {
        newCell.x += 1
        newCell.z -= 1
        if (isCellExist(grid, newCell)) {
          if (grid[getCellIdx(grid, newCell)].value === 0) {
            result = {...newCell}
          }
        }
      }
      return result
    })
    dispatch(clearCells())
    cellsWithValues.forEach(cell => {
      dispatch(setCell(cell))
    })
  }

  return (
    <>
      <main className={styles.app}>
        <section className={styles.gameVariant}>
          <p>{`Game size: ${gridSize}`}</p>

          <div className={styles.variantControls}>
            <button onClick={() => {
              dispatch(setGridSize(2))
              dispatch(setGrid(gameGrid2))
            }}>2</button>
            <button onClick={() => {
              dispatch(setGridSize(3))
              dispatch(setGrid(gameGrid3))
            }}>3</button>
          </div>
        </section>

        <section className={styles.gameGrid} >
          <Grid />
        </section>
        <section className={styles.gameStatus}>
          <p>{`Game status: playing`}</p>
          <div className={styles.gameControls}>
            <button onClick={() => {
              moveLeftTopHandler()
            }}>q</button>
            <button onClick={() => {
              moveUpHandler()
            }}>w</button>
            <button onClick={() => {
              moveRightTopHandler()
            }}>e</button>
            <button onClick={() => {
              moveLeftBottomHandler()
            }}>a</button>
            <button onClick={() => {
              moveDownHandler()
            }}>s</button>
            <button onClick={() => {
              moveRightBottomHandler()
            }}>d</button>
          </div>
          <button onClick={() => {

          }}>
            test
          </button>
        </section>
      </main>
    </>
  );
}

export default App;
