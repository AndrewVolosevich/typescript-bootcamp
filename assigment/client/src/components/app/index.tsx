import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Grid from "../grid";
import styles from './app.module.scss';
import {
  setGridSize,
  setGrid,
  selectSize,
} from '../../store/features/game/gameSlice';
import api from '../../api/serverApi'
import {gameGrid2, gameGrid3} from "../../moky/gameGrid";

const keyPressHandler = (event) => {
  // console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`)
}

const App = () => {
  useEffect(() => {
    api.getStartData(2).then(resp => console.log(resp))
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler)

    return () => {
      document.removeEventListener('keydown', keyPressHandler)
    }
  }, [])

  const gridSize = useSelector(selectSize)
  const dispatch = useDispatch()

  return (
    <>
      <p>{gridSize}</p>
      <button onClick={() => {
        dispatch(setGridSize(2))
        dispatch(setGrid(gameGrid2))
      }}>2</button>
      <button onClick={() => {
        dispatch(setGridSize(3))
        dispatch(setGrid(gameGrid3))
      }}>3</button>

      <div className={styles.app} >
        <Grid />
      </div>
    </>
  );
}

export default App;
