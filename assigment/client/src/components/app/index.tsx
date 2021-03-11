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
import {
  setWidth,
  addCellsWithValues, changeAnimationCell,
  removeCellsWithValues,
} from '../../store/features/game/animationSlice'
import api from '../../api/serverApi'
import {compareCellsCoords, getCellIdx, getSortedCells, isCellExist} from "../../helpers/cellHelpers";
import {Cell} from "../../types/game";
import GameVariant from "../game-variant";
import AnimationGrid from "../animation-grid";
import hash from "object-hash"

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
          const newCellIdx = getCellIdx(newGridValue, newCell)
          if (newGridValue[newCellIdx].value === 0) {
            newGridValue[newCellIdx].value = cell.value
            newGridValue[getCellIdx(newGridValue, cell)].value = 0
            dispatch(changeAnimationCell([cell, newCell]))
            return checkNext(newGridValue, newCell, max, min)
          } else if (
            newGridValue[newCellIdx].value === cell.value &&
            !newGridValue[newCellIdx].isChanged
          ) {
            newGridValue[newCellIdx].value = cell.value * 2
            newGridValue[newCellIdx].isChanged = true
            newGridValue[getCellIdx(newGridValue, cell)].value = 0
            dispatch(removeCellsWithValues(newCell))
            dispatch(changeAnimationCell([cell, newGridValue[newCellIdx]]))
            return checkNext(newGridValue, newCell, max, min)
          }
        }
        return newGridValue
      }
      function moveHandler(max: string, min: string) {
        if (playing) {
          let gridWithChanges = JSON.parse(JSON.stringify(grid))
          const cellsWithValues = getSortedCells(grid,  max, min)
          cellsWithValues.forEach(cell => {
            gridWithChanges = checkNext(gridWithChanges, cell, max, min)
          })
          dispatch(clearCells())
          gridWithChanges.forEach(cell => dispatch(setCell(cell)))
          const isFull = () => {
            return !gridWithChanges.filter(item => item.value === 0).length
          }
          if (isFull()) {
            dispatch(setPlaying(false))
          } else {
            api
              .uploadNewData(gridSize, cellsWithValues)
              .then(resp => {
                resp.data.forEach((item) => {
                  dispatch(setCell(item))
                })

                grid.filter(item => {
                  let isExist = false
                  resp.data.forEach(downloadItem => {
                    if (compareCellsCoords(downloadItem, item)) {
                      isExist = true
                    }
                  })
                  return isExist
                }).forEach(item => dispatch(addCellsWithValues(item)))
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
  const resizeHandler = () => {
    dispatch(setWidth(window.innerWidth))
  }
  useEffect(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <>
      <main className={styles.app}>
        <GameVariant />
        <section className={styles.gameGrid} >
          <AnimationGrid />
          <Grid />
        </section>
        <section className={styles.gameStatus}>
          <p className={styles.status}>{`Game status: ${playing ? 'playing' : 'game-over'}`}</p>
          <p>Use q, w, e, a, s, d keys for move</p>
          <button onClick={() => {
            dispatch(removeCellsWithValues({
              x: 0,
              y: 0,
              z: 0,
              value: 2
            }))
          }}>test</button>
        </section>
      </main>
    </>
  );
}

export default App;
