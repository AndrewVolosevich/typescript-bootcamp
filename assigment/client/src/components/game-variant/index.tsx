import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  clearCells, selectGrid,
  selectSize,
  setCell,
  setGrid,
  setGridSize,
  setPlaying
} from "../../store/features/game/gameSlice";
import {setCellsWithValues} from "../../store/features/game/animationSlice";
import styles from "./game-variant.module.scss";
import api from "../../api/serverApi";
import {gameGrid2, gameGrid3, gameGrid4} from "../../moky/gameGrid";
import hash from "object-hash"
import {Cell} from "../../types/game";
import {compareCellsCoords} from "../../helpers/cellHelpers";

const GameVariant = () => {
  const size = useSelector(selectSize)
  const grid = useSelector(selectGrid)

  const dispatch = useDispatch()
  const addFetchCells = (fieldSize: number) => {
    api.getStartData(fieldSize)
      .then(resp => {
        resp.data.forEach((newCell) => {
          dispatch(setCell(newCell))
        })
        return resp.data
      })
      .then((resp: Cell[]) => {
        const addedCells = grid.filter(item => {
          let isExist = false
          resp.forEach(downloadItem => {
            if (compareCellsCoords(downloadItem, item)) {
              isExist = true
            }
          })
          return isExist
        })
        dispatch(setCellsWithValues(addedCells))
      })
      .then(() => {
        dispatch(setPlaying(true))
      })
  }
  const chooseGameVariant = (variant: number) => {
    dispatch(setPlaying(false))
    dispatch(clearCells())
    dispatch(setGridSize(variant))
    dispatch(setGrid(
      (variant === 2
        ? gameGrid2
        : variant === 3
        ? gameGrid3
        : gameGrid4).map(item => ({...item, id: hash(item)}))
    ))
    addFetchCells(variant)
  }

  return (
    <>
      <section className={styles.gameVariant}>
        <p>{'Select radius:'}</p>
        <button className={`${styles.button} ${size === 2 ? styles.checked : ''}`} onClick={() => {
          chooseGameVariant(2)
        }}>2</button>
        <button className={`${styles.button} ${size === 3 ? styles.checked : ''}`} onClick={() => {
          chooseGameVariant(3)
        }}>3</button>
        <button className={`${styles.button} ${size === 4 ? styles.checked : ''}`} onClick={() => {
          chooseGameVariant(4)
        }}>4</button>
      </section>
    </>
  );
}

export default GameVariant;





