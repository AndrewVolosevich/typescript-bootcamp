import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Grid from "../grid";
import styles from './app.module.scss';
import {
  setGridSize,
  setGrid,
  setCell,
  selectSize,
} from '../../store/features/game/gameSlice';
import api from '../../api/serverApi'
import {gameGrid2, gameGrid3} from "../../moky/gameGrid";

const keyPressHandler = (event) => {
  // console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`)
}

const App = () => {
  const gridSize = useSelector(selectSize)
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

            }}>q</button>
            <button onClick={() => {

            }}>w</button>
            <button onClick={() => {

            }}>e</button>
            <button onClick={() => {

            }}>a</button>
            <button onClick={() => {

            }}>s</button>
            <button onClick={() => {

            }}>d</button>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
