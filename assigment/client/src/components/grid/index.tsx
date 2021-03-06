import React from "react";
import styles from "./grid.module.scss"

const Grid = () => {
  return (
    <div>
      <div className={styles.element} data-value={0} data-x={-1} data-y={1} data-z={0} style={{left: '4px', top: '69.282px'}}/>
      <div className={styles.element} data-value={0} data-x={-1} data-y={0} data-z={1} style={{left: '4px', top: '203.846px'}}/>
      <div className={styles.element} data-value={0} data-x={0} data-y={1} data-z={-1} style={{left: '120px', top: '4px'}}/>
      <div className={styles.element} data-value={0} data-x={0} data-y={0} data-z={0} style={{left: '120px', top: '138.564px'}}/>
      <div className={styles.element} data-value={0} data-x={0} data-y={-1} data-z={1} style={{left: '120px', top: '273.128px'}}/>
      <div className={styles.element} data-value={0} data-x={1} data-y={0} data-z={-1} style={{left: '236px', top: '69.282px'}}/>
      <div className={styles.element} data-value={0} data-x={1} data-y={-1} data-z={0} style={{left: '236px', top: '203.846px'}}/>
    </div>
  );
}

export default Grid;


