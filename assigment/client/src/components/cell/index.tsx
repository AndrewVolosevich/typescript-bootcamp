import React, {useRef} from "react";
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import {selectSize} from "../../store/features/game/gameSlice";
import styles from "./cell.module.scss";

const Cell = (props: {
  x: number,
  y: number,
  z: number,
  value: number,
  id: string,
}) => {
  const cellRef = useRef(null)
  const size = useSelector(selectSize)

  const cellClasses = classNames(styles.element, 'cell', {
    [styles.size3]: size === 3,
    [styles.size4]: size === 4,
  })
  return (
   <>
     <div
       ref={cellRef}
       className={cellClasses}
       id={props.id}
       data-value={props.value}
       data-x={props.x}
       data-y={props.y}
       data-z={props.z}
     >
       <span>{props.value === 0 ? ' ' : props.value}</span>
     </div>
   </>
  );
}

export default Cell;





