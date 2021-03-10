import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./animation-grid.module.scss"
import {selectAnimatedCells} from "../../store/features/game/animationSlice";
import AnimationCell from "../animation-cell";
import {Cell} from "../../types/game";

const AnimationGrid = (props: {
  grid: Cell[]
}) => {
  const animatedGrid = useSelector(selectAnimatedCells)
  const ss = 'ss'

  return (
    <div >
      {
        animatedGrid.map((item) => {
          return (
            <AnimationCell
              key={`animate-${item.x}-${item.y}-${item.z}`}
              value={item.value}
              x={item.x}
              y={item.y}
              z={item.z}
            />
          )
        })
      }
    </div>
  );
}

export default AnimationGrid;


