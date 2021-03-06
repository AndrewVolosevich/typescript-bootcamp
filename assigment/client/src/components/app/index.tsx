import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import Grid from "../grid";
import styles from './app.module.scss';
import {
  increment,
  decrement,
  addCell,
  selectGame2
} from '../../store/features/game/gameSlice';
import api from '../../api/serverApi'

const keyPressHandler = (event) => {
  console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`)
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

  const count = useSelector(state => state.game.value)
  const count2 = useSelector(selectGame2)
  const dispatch = useDispatch()

  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <p>{count2}</p>
      <button onClick={() => dispatch(addCell(1))}>add</button>

      <div className={styles.app} onKeyDown={(e) => console.log(e)}>
        <div className={styles.container} >
          <Grid />
        </div>
      </div>
    </>
  );
}

export default App;
