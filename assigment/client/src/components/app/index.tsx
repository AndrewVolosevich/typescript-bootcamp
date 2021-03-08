import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Grid from "../grid";
import styles from './app.module.scss';
import {
  setGridSize,
  setGrid,
  setCell,
  setPlaying,
  clearCellValue,
  clearCells,
  selectSize, selectGrid, selectPlaying
} from '../../store/features/game/gameSlice';
import api from '../../api/serverApi'
import {gameGrid2, gameGrid3} from "../../moky/gameGrid";
import {getCellIdx, getSortCells, getSortCells1, isCellExist} from "../../helpers/cellHelpers";
import {log} from "util";
import {Cell} from "../../types/game";

const keyPressHandler = (event, q,w,e,a,s,d) => {
  switch (event.key) {
    case 'q':
      q()
      break
    case 'w':
      w()
      break
    case 'e':
      e()
      break
    case 'a':
      a()
      break
    case 's':
      s()
      break
    case 'd':
      d()
      break
    default:
      break
  }
}
const App = () => {
  const gridSize = useSelector(selectSize)
  const grid = useSelector(selectGrid)
  const playing = useSelector(selectPlaying)
  const dispatch = useDispatch()

  useEffect(() => {
    if (playing) {
      document.addEventListener('keydown', (e) => {
        keyPressHandler(
          e, moveLeftTopHandler, moveUpHandler,
          moveRightTopHandler, moveLeftBottomHandler,
          moveDownHandler, moveRightBottomHandler)
      })
      return () => {
        document.removeEventListener('keydown', (e) => {
          keyPressHandler(
            e, moveLeftTopHandler, moveUpHandler,
            moveRightTopHandler, moveLeftBottomHandler,
            moveDownHandler, moveRightBottomHandler)
        })
      }
    }
  }, [playing])

  function pow(x, n) {
    if (n == 1) {
      return x;
    } else {
      return x * pow(x, n - 1);
    }
  }

  function checkNext(cell, max, min) {
    console.log(cell)
    const newCell = {...cell}
    let result = {...cell}
    newCell[max] += 1
    newCell[min] -= 1
    dispatch(clearCellValue(cell))

    if (isCellExist(grid, newCell)) {
      if (grid[getCellIdx(grid, newCell)].value === 0) {
        result = {...newCell}
        dispatch(setCell(result))
      }
      return checkNext(newCell, 'y', 'z')
    } else {
      dispatch(setCell(cell))
    }
  }

  function checkNext1(gridValue: Cell[], cell: Cell, max: string, min: string) {
    const newCell = {...cell}
    const newGridValue = JSON.parse(JSON.stringify(gridValue))
    newCell[max] += 1
    newCell[min] -= 1

    if (isCellExist(gridValue, newCell)) {
      if (newGridValue[getCellIdx(newGridValue, newCell)].value === 0) {
        newGridValue[getCellIdx(newGridValue, newCell)].value = cell.value
        newGridValue[getCellIdx(newGridValue, cell)].value = 0
        return checkNext1(newGridValue, newCell, 'y', 'z')
      }
    }
    return newGridValue
  }

  const moveUpHandler = () => {
    console.log('up')
    console.log(getSortCells(grid,  'y', 'z'))
    getSortCells(grid,  'y', 'z').forEach(cell => {
      const newArr = checkNext1(grid, cell, 'y', 'z')
      dispatch(clearCells())
      newArr.forEach(cell => dispatch(setCell(cell)))
    })
  }
  const moveDownHandler = () => {
    console.log('down')
    getSortCells(grid, 'z', 'y').forEach(cell => {
      checkNext(cell, 'z', 'y')
    })
  }
  const moveLeftTopHandler = () => {
    console.log('leftTop')
    getSortCells(grid, 'y', 'z').forEach(cell => {
      checkNext(cell, 'y', 'z')
    })
  }
  const moveRightBottomHandler = () => {
    console.log('rightBottom')
    getSortCells(grid, 'x', 'y').forEach(cell => {
      checkNext(cell, 'x', 'y')
    })
  }
  const moveLeftBottomHandler = () => {
    console.log('leftBottom')
    getSortCells(grid, 'z', 'x').forEach(cell => {
      checkNext(cell, 'z', 'x')
    })
  }
  const moveRightTopHandler = () => {
    console.log('rightTop')
    getSortCells(grid, 'x', 'z').forEach(cell => {
      checkNext(cell, 'x', 'z')
    })
  }

  const addFetchCells = (value: number) => {
    api.getStartData(value)
      .then(resp => {
        const addedCells = resp.data
        addedCells.forEach((newCell => {
          dispatch(setCell(newCell))
        }))
      })
      .then(() => {
      dispatch(setPlaying(true))

    })
  }

  return (
    <>
      <main className={styles.app}>
        <section className={styles.gameVariant}>
          <p>{`Game size: ${gridSize}`}</p>

          <div className={styles.variantControls}>
            <button onClick={() => {
              dispatch(setPlaying(false))
              dispatch(clearCells())
              dispatch(setGridSize(2))
              dispatch(setGrid(gameGrid2))
              addFetchCells(2)
            }}>2</button>
            <button onClick={() => {
              dispatch(setPlaying(false))
              dispatch(clearCells())
              dispatch(setGridSize(3))
              dispatch(setGrid(gameGrid3))
              addFetchCells(3)
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
            dispatch(clearCellValue({x: 0, y: 0, z: 0, value: 2}))
          }}>
            test
          </button>
        </section>
      </main>
    </>
  );
}

export default App;
