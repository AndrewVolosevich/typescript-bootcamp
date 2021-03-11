import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./animation-grid.module.scss"
import {selectAnimatedCells} from "../../store/features/game/animationSlice";
import AnimationCell from "../animation-cell";

const AnimationGrid = () => {
  const animatedGrid = useSelector(selectAnimatedCells)

  return (
    <div >
      {
        animatedGrid.map((item, index) => {
          return (
            <AnimationCell
              key={`animate-${index}`}
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


