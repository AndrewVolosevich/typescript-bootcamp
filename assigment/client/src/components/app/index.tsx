import React, {useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Grid from "../grid";
import styles from './app.module.scss';
import {
  setCell,
  setPlaying,
  clearCells,
  addStep,
  selectSize, selectGrid, selectPlaying, selectStep
} from '../../store/features/game/gameSlice';
import api from '../../api/serverApi'
import {getCellIdx, getSortCells, isCellExist} from "../../helpers/cellHelpers";
import {Cell} from "../../types/game";
import GameVariant from "../game-variant";

const App = () => {
  const gridSize = useSelector(selectSize)
  const grid = useSelector(selectGrid)
  const playing = useSelector(selectPlaying)
  const step = useSelector(selectStep)
  const dispatch = useDispatch()

  const memoKeyPressHandler = useCallback(
    (evt) => {
      function checkNext(gridValue: Cell[], cell: Cell, max: string, min: string) {
        const newCell = {...cell}
        const newGridValue = JSON.parse(JSON.stringify(gridValue)).map(item => {
          if (!item.isChanged) {
            return {...item, isChanged: false}
          } else {
            return item
          }
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
      switch (evt.key) {
        case 'q':
          moveHandler('y', 'x')
          break
        case 'w':
          moveHandler('y', 'z')
          break
        case 'e':
          moveHandler('x', 'z')
          break
        case 'a':
          moveHandler('z', 'x')
          break
        case 's':
          moveHandler('z', 'y')
          break
        case 'd':
          moveHandler('x', 'y')
          break
        default:
          break
      }
    },
    [dispatch, grid, gridSize, playing]
  );

  useEffect(() => {
    if (playing) {
      document.addEventListener('keydown', memoKeyPressHandler)
    } else {
      document.removeEventListener('keydown', memoKeyPressHandler)
    }
    return () => {
      document.removeEventListener('keydown', memoKeyPressHandler)
    }
  }, [playing, step, memoKeyPressHandler])

  return (
    <>
      <main className={styles.app}>
        <GameVariant />
        <section className={styles.gameGrid} >
          <Grid />
        </section>
        <section className={styles.gameStatus}>
          <p>{`Game status: ${playing ? 'playing' : 'game-over'}`}</p>
          <p>Use q, w, e, a, s, d keys for move</p>
        </section>
      </main>
    </>
  );
}

export default App;
