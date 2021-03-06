import React, {useRef} from "react";
import styles from "./cell.module.scss"

const Cell = (props: {
  x: number,
  y: number,
  z: number,
  value: number
}) => {
  const cellRef = useRef(null)

  return (
   <>
     <div
       ref={cellRef}
       className={styles.element}
       data-value={props.value}
       data-x={props.x}
       data-y={props.y}
       data-z={props.z}
     />
   </>
  );
}

export default Cell;





