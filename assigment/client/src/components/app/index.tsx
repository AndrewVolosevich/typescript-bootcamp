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
import {getCellIdx, getSortCells, isCellExist} from "../../helpers/cellHelpers";
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

  function checkNext(gridValue: Cell[], cell: Cell, max: string, min: string) {
    const newCell = {...cell}
    const newGridValue = JSON.parse(JSON.stringify(gridValue)).map(item => {
      return {...item, isChanged: false}
    })
    newCell[max] += 1
    newCell[min] -= 1

    if (isCellExist(gridValue, newCell)) {
      if (newGridValue[getCellIdx(newGridValue, newCell)].value === 0) {
        newGridValue[getCellIdx(newGridValue, newCell)].value = cell.value
        newGridValue[getCellIdx(newGridValue, cell)].value = 0
        return checkNext(newGridValue, newCell, max, min)
      } else if (
        newGridValue[getCellIdx(newGridValue, newCell)].value === cell.value &&
        !newGridValue[getCellIdx(newGridValue, newCell)].isChanged
      ) {
        newGridValue[getCellIdx(newGridValue, newCell)].value = cell.value * 2
        newGridValue[getCellIdx(newGridValue, newCell)].isChanged = true
        newGridValue[getCellIdx(newGridValue, cell)].value = 0
        return checkNext(newGridValue, newCell, max, min)
      }
    }
    return newGridValue
  }
  function moveHandler(max: string, min: string) {
    let innerGrid = JSON.parse(JSON.stringify(grid))
    getSortCells(grid,  max, min).forEach(cell => {
      innerGrid = checkNext(innerGrid, cell, max, min)
    })
    dispatch(clearCells())
    innerGrid.forEach(cell => dispatch(setCell(cell)))
    const filledCells = getSortCells(innerGrid,  max, min)
    api
      .uploadNewData(gridSize, filledCells)
      .then(resp => {
        resp.data.forEach(item => {
          console.log(item)
          dispatch(setCell(item))
        })
      })
  }

  const moveUpHandler = () => {
    console.log('up')
    moveHandler('y', 'z')
  }
  const moveDownHandler = () => {
    console.log('down')
    moveHandler('z', 'y')
  }
  const moveLeftTopHandler = () => {
    console.log('leftTop')
    moveHandler('y', 'x')
  }
  const moveRightBottomHandler = () => {
    console.log('rightBottom')
    moveHandler('x', 'y')
  }
  const moveLeftBottomHandler = () => {
    console.log('leftBottom')
    moveHandler('z', 'x')
  }
  const moveRightTopHandler = () => {
    console.log('rightTop')
    moveHandler('x', 'z')
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
