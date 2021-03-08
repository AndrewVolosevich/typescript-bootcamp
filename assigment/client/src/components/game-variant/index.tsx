import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {clearCells, selectSize, setCell, setGrid, setGridSize, setPlaying} from "../../store/features/game/gameSlice";
import styles from "./game-variant.module.scss";
import api from "../../api/serverApi";
import {gameGrid2, gameGrid3, gameGrid4} from "../../moky/gameGrid";

const GameVariant = () => {
  const size = useSelector(selectSize)
  const dispatch = useDispatch()
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
    dispatch(setGrid(
      variant === 2
        ? gameGrid2
        : variant === 3
        ? gameGrid3
        : gameGrid4
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





