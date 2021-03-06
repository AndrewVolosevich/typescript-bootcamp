import React, {useEffect} from "react";
import Grid from "../grid";
import styles from './app.module.scss';
import axios from "axios";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from '../../store/features/game/gameSlice';

const api = {
  getData: () => {
    return axios.post(
      `http://localhost:5555/2`,
      []
    );
  },
}

function App() {
  useEffect(() => {
    api.getData().then(resp => console.log(resp))
  }, [])
  return (
    <>
      <div className={styles.app}>
        <div className={styles.container}>
          <Grid />
        </div>
      </div>
    </>
  );
}

export default App;
