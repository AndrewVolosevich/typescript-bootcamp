import React from "react";
import styles from "./cell.module.scss"

const Cell = (props: {
  x: number,
  y: number,
  z: number,
  value: number
}) => {
  return (
   <>
     <div
       className={styles.element}
       data-value={props.value}
       data-x={props.x}
       data-y={props.y}
       data-z={props.z}
       style={{left: '4px', top: '69.282px'}} // ???????????????????????
     />
   </>
  );
}

export default Cell;





