import React, {useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Grid from "../grid";
import styles from './app.module.scss';
import {
  setGridSize,
  setGrid,
  setCell,
  setPlaying,
  clearCells,
  addStep,
  selectSize, selectGrid, selectPlaying, selectStep
} from '../../store/features/game/gameSlice';
import api from '../../api/serverApi'
import {gameGrid2, gameGrid3} from "../../moky/gameGrid";
import {getCellIdx, getSortCells, isCellExist} from "../../helpers/cellHelpers";
import {Cell} from "../../types/game";

const App = () => {
  const gridSize = useSelector(selectSize)
  const grid = useSelector(selectGrid)
  const playing = useSelector(selectPlaying)
  const step = useSelector(selectStep)
  const dispatch = useDispatch()

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
    if (playing) {
      let innerGrid = JSON.parse(JSON.stringify(grid))
      getSortCells(grid,  max, min).forEach(cell => {
        innerGrid = checkNext(innerGrid, cell, max, min)
      })
      dispatch(clearCells())
      innerGrid.forEach(cell => dispatch(setCell(cell)))
      const isFull = () => {
        return !innerGrid.filter(item => item.value === 0).length
      }
      if (isFull()) {
        dispatch(setPlaying(false))
      } else {
        const filledCells = getSortCells(innerGrid,  max, min)
        api
          .uploadNewData(gridSize, filledCells)
          .then(resp => {
            resp.data.forEach(item => {
              dispatch(setCell(item))
            })
          })
          .then(() => dispatch(addStep()))
      }
    }
  }

  const moveUpHandler = () => {
    moveHandler('y', 'z')
  }
  const moveDownHandler = () => {
    moveHandler('z', 'y')
  }
  const moveLeftTopHandler = () => {
    moveHandler('y', 'x')
  }
  const moveRightBottomHandler = () => {
    moveHandler('x', 'y')
  }
  const moveLeftBottomHandler = () => {
    moveHandler('z', 'x')
  }
  const moveRightTopHandler = () => {
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
  const chooseGameVariant = (variant: number) => {
    dispatch(setPlaying(false))
    dispatch(clearCells())
    dispatch(setGridSize(variant))
    dispatch(setGrid(variant === 2 ? gameGrid2 : gameGrid3))
    addFetchCells(variant)
  }

  const memoizedCallback = useCallback(
    (evt) => {
      switch (evt.key) {
        case 'q':
          moveLeftTopHandler()
          break
        case 'w':
          moveUpHandler()
          break
        case 'e':
          moveRightTopHandler()
          break
        case 'a':
          moveLeftBottomHandler()
          break
        case 's':
          moveDownHandler()
          break
        case 'd':
          moveRightBottomHandler()
          break
        case 't':
          console.log(grid)
          break
        default:
          break
      }
    },
    [
      step, gridSize,
      moveUpHandler, moveDownHandler,
      moveLeftTopHandler, moveRightBottomHandler,
      moveLeftBottomHandler, moveRightTopHandler
    ]
  );

  useEffect(() => {
    if (playing) {
      document.addEventListener('keydown', memoizedCallback)
    } else {
      document.removeEventListener('keydown', memoizedCallback)
    }
    return () => {
      document.removeEventListener('keydown', memoizedCallback)
    }
  }, [playing, step])
  return (
    <>
      <main className={styles.app}>
        <section className={styles.gameVariant}>
          <p>{`Game size: ${gridSize}`}</p>
          <div className={styles.variantControls}>
            <button onClick={() => {
              chooseGameVariant(2)
            }}>2</button>
            <button onClick={() => {
              chooseGameVariant(3)
            }}>3</button>
          </div>
        </section>

        <section className={styles.gameGrid} >
          <Grid />
        </section>
        <section className={styles.gameStatus}>
          <p>{`Game status: ${playing ? 'playing' : 'game over'}`}</p>
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
        </section>
      </main>
    </>
  );
}

export default App;
