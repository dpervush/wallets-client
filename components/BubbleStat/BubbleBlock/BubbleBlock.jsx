import React from "react";
import { Stage, Layer, Text, Arc } from "react-konva";

import Bubble from "../Bubble/Bubble";

import styles from "../BubbleStat.module.scss";

const CANVA_WIDTH = 475;
const CANVA_HEIGHT = 390;

export const BubbleBlock = ({ data, width }) => {
  const [maxSum, setMaxSum] = React.useState(0);
  const [bubbles, setBubbles] = React.useState([]);

  React.useEffect(() => {
    const maxSum = Math.max(...data.map((item) => +item.sum));

    setMaxSum(maxSum);
  }, [data]);

  React.useEffect(() => {
    renderBubbles();
  }, [maxSum]);

  const renderBubbles = () => {
    const bubblesWithoutCoordinates = [...data];

    const bubblesWithCoordinates = [];

    let intervalsCountXAxis = Math.ceil(
      Math.sqrt(bubblesWithoutCoordinates.length)
    );

    let intervalsCountYAxis = Math.ceil(
      Math.sqrt(bubblesWithoutCoordinates.length)
    );

    if (
      intervalsCountYAxis * (intervalsCountYAxis - 1) >
      bubblesWithoutCoordinates.length
    ) {
      intervalsCountYAxis -= 1;
    }

    const intervalsWidth = width / intervalsCountXAxis;

    const intervalsHeight = CANVA_HEIGHT / intervalsCountYAxis;

    for (let i = 0; i < bubblesWithoutCoordinates.length; i++) {
      const item = bubblesWithoutCoordinates[i];

      const radius = 40 + 20 * (item.sum / maxSum);

      const xStart = (i % intervalsCountXAxis) * intervalsWidth;
      const xEnd = ((i % intervalsCountXAxis) + 1) * intervalsWidth;

      const yStart = Math.floor(i / intervalsCountXAxis) * intervalsHeight;
      const yEnd = Math.floor(i / intervalsCountXAxis + 1) * intervalsHeight;

      const xAxis =
        xStart +
        (xEnd - xStart) / 2 +
        Math.random() * 20 * Math.pow(-1, Math.floor(Math.random() * 10));
      const yAxis =
        yStart +
        (yEnd - yStart) / 2 +
        Math.random() * 20 * Math.pow(-1, Math.floor(Math.random() * 10));

      bubblesWithCoordinates[i] = {
        ...item,
        radius,
        xAxis,
        yAxis
      };
    }

    setBubbles(bubblesWithCoordinates);
  };

  return (
    <div className={styles.canvas}>
      <Stage width={width} height={CANVA_HEIGHT}>
        <Layer>
          {bubbles.map((category, index) => (
            <Bubble
              key={category.id}
              x={category.xAxis}
              y={category.yAxis}
              radius={category.radius}
              category={width > 430 ? category.title : null}
              color={category.color}
              balance={category.sum}
              budget={category.budget}
              icon={category.icon}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
