import React, {useEffect, useRef, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from "./animation-cell.module.scss"
import {selectAnimatedCells, selectWidth} from "../../store/features/game/animationSlice";
import {selectSize} from "../../store/features/game/gameSlice";

const AnimationCell = (props: {
  x: number,
  y: number,
  z: number,
  value: number
}) => {
  const [startLeft, setStartLeft] = useState<number>(0)
  const [startTop, setStartTop] = useState<number>(0)
  const ggg = useSelector(selectAnimatedCells)
  const size = useSelector(selectSize)
  const deviceWidth = useSelector(selectWidth)

  useEffect(() => {
    const el = document.getElementById(`${props.x}-${props.y}-${props.z}`)
    if (el) {
      // @ts-ignore
      const x = Math.round(el.getBoundingClientRect().left)
      // @ts-ignore
      const y = Math.round(el.getBoundingClientRect().top)
      setStartLeft(x)
      setStartTop(y)
    }
  }, [ggg, deviceWidth])

  const cellClasses = classNames(styles.animatedCell, {
    [styles.size3]: size === 3,
    [styles.size4]: size === 4,
  })
  return (
    <div
      className={cellClasses}
      // @ts-ignore
      style={{left: `${startLeft}px`, top: `${startTop}px`}}
      data-value={props.value}
      data-x={props.x}
      data-y={props.y}
      data-z={props.z}
    >
      <span>{props.value === 0 ? ' ' : props.value}</span>
    </div>
  );
}

export default AnimationCell;


