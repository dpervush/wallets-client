import React from "react";
import { Stage, Layer, Text, Arc, Circle } from "react-konva";
import { formatCurrency } from "../../utils";

const StatConva = ({
  radius = 130,
  allAmount,
  allAmountConsidered,
  cardsWithAngles
}) => {
  return (
    <Stage width={270} height={270}>
      <Layer>
        <Circle
          x={135}
          y={135}
          radius={radius}
          opacity={0.2}
          stroke="#ffffff"
          strokeWidth={6}
        />
        <Arc
          x={135}
          y={135}
          angle={(allAmountConsidered / allAmount) * 360}
          innerRadius={radius - 3}
          outerRadius={radius + 3}
          fill="#172EFF"
          rotation={-90}
          lineCap="round"
        />
        {cardsWithAngles?.map((card, index) => (
          <Arc
            key={card.id}
            x={135}
            y={135}
            innerRadius={radius - 10}
            outerRadius={radius - 16}
            lineCap="round"
            fill={card.color}
            angle={(card.balance / allAmountConsidered) * 360 - 5}
            rotation={card.rotation - 90}
          />
        ))}
        <Arc angle={160} rotation={-90} />
        <Arc angle={30} rotation={80} />
        <Text
          x={135 - radius}
          y={135 - radius / 2}
          width={radius * 2}
          align="center"
          text={"Overall"}
          fontSize={14}
          fontFamily="Montserrat"
          fill="#ffffff"
        />
        <Text
          x={135 - radius}
          y={135 - 13}
          width={radius * 2}
          align="center"
          text={
            allAmountConsidered &&
            formatCurrency(allAmountConsidered, "RUB").slice(0, -3)
          }
          fontSize={42}
          fontFamily="BebasNeue"
          fill="#ffffff"
        />
      </Layer>
    </Stage>
  );
};

export default StatConva;
