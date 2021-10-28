import React from "react";
import { Stage, Layer, Text, Arc, Circle } from "react-konva";
import { CoinsIcon, PlayIcon, SettingsIcon } from "../icons";
import Button from "../UI/Button/Button";

import styles from "./RoundStat.module.scss";

const RoundStat = ({ radius = 100, amount = "$9,512.00" }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.settings}>
        <Button padding="12px">
          <SettingsIcon />
        </Button>
      </div>
      <div className={styles.canvas}>
        <Stage width={210} height={210}>
          <Layer>
            <Arc
              x={105}
              y={105}
              angle={280}
              innerRadius={radius - 3}
              outerRadius={radius + 3}
              fill="#8A16FF"
              rotation={-90}
              lineCap="round"
            />
            <Circle
              x={105}
              y={105}
              radius={radius}
              opacity={0.2}
              stroke="#ffffff"
              strokeWidth={6}
            />
            <Arc
              x={105}
              y={105}
              angle={160}
              innerRadius={radius - 10}
              outerRadius={radius - 16}
              fill="#FF25C2"
              rotation={-90}
              lineCap="round"
            />
            <Arc
              x={105}
              y={105}
              angle={30}
              innerRadius={radius - 10}
              outerRadius={radius - 16}
              fill="#24DFFE"
              rotation={80}
              lineCap="round"
            />
            <Text
              x={105 - radius}
              y={105 - radius / 2}
              width={radius * 2}
              align="center"
              text={"Overall"}
              fontSize={14}
              fontFamily="Montserrat"
              fill="#ffffff"
            />
            <Text
              x={105 - radius}
              y={105 - 13}
              width={radius * 2}
              align="center"
              text={amount}
              fontSize={42}
              fontFamily="BebasNeue"
              fill="#ffffff"
            />
          </Layer>
        </Stage>
      </div>
      <div className={styles.goals}>
        <div className={styles.coins}>
          <CoinsIcon />
        </div>
        <div className={styles.text}>Set new financial goals for 2021</div>
        <button className={styles.btn}>
          <PlayIcon />
        </button>
      </div>
    </div>
  );
};

export default RoundStat;
