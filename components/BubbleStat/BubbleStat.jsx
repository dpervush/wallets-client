import React from "react";
import dynamic from "next/dynamic";
import { Stage, Layer, Text, Arc } from "react-konva";

import styles from "./BubbleStat.module.scss";

const Bubble = dynamic(() => import("./Bubble/Bubble"));

const BubbleStat = () => {
  return (
    <div className={styles.canvas}>
      <Stage width={475} height={390}>
        <Layer>
          <Bubble x={100} y={100} radius={50} />
          <Bubble x={300} y={300} radius={65} />
        </Layer>
      </Stage>
    </div>
  );
};

export default BubbleStat;
