import React, {useEffect, useState} from "react";
import Cell from "../cell";
import { useSelector } from 'react-redux'
import {selectGrid, selectSize} from "../../store/features/game/gameSlice";
import {radius2, radius3} from "../../moky/gameGrid";
import styles from "./grid.module.scss"

const Grid = () => {
  const [gridColums, setGridColums] = useState(radius2)
  const size = useSelector(selectSize)
  const grid = useSelector(selectGrid)

  useEffect(() => {
    switch (size) {
      case 2:
        setGridColums(radius2)
        return

      case 3:
        setGridColums(radius3)
        return;

      default:
        setGridColums(radius2)
        return;
    }
  }, [size])

  return (
    <div className={styles.wrapper} style={{transform: 'translateX(9%)'}}>
      {
        gridColums.map((col, colN) => (
          <section key={colN} style={{right: `${colN/3*120}px`}}>
            {
              grid.map((cell) => {
                if (colN == cell.x + (size - 1)) return (
                  <Cell
                    key={`${cell.x}-${cell.y}-${cell.z}`}
                    x={cell.x}
                    y={cell.y}
                    z={cell.z}
                    value={cell.value}
                  />
                )
              })
            }
          </section>
        ))
      }
    </div>
  )
}

export default Grid;


