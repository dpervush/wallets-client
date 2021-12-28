import React from "react";
import { Arc, Circle, Text, Image, Path } from "react-konva";
import useImage from "use-image";
import IconsSVG from "../../icons/categoriesIcons/CategoriesIcons.svg";

const Bubble = ({ x, y, radius, category, balance, budget, icon, color }) => {
  const path = `/assets/icons/categoriesIcons/${icon || "airplane"}.svg`;
  const [image] = useImage(path);

  return (
    <>
      <Arc
        x={x}
        y={y}
        angle={(balance / (budget || balance)) * 360}
        innerRadius={radius - 1}
        outerRadius={radius + 1}
        fill={color || "#8a16ff"}
        rotation={-90}
      />
      <Circle x={x} y={y} radius={radius - 1} fill={color} opacity={0.2} />
      <Circle
        x={x}
        y={y}
        radius={radius}
        opacity={0.1}
        stroke="#ffffff"
        strokeWidth={2}
      />
      <Text
        x={x - radius}
        y={y + radius / 5}
        width={radius * 2}
        align="center"
        text={category?.toLowerCase()}
        fontStyle="bold"
        fill="#ffffff"
        fontSize={10}
      />
      <Text
        x={x - radius}
        y={y + radius / 2}
        width={radius * 2}
        text={balance || 0}
        fill="#ffffff"
        align="center"
        letterSpacing={1}
        fontStyle="bold"
        opacity={0.5}
        fontSize={9}
      />
      <Image
        x={x - radius / 4}
        y={y - radius / 2}
        width={radius / 2}
        height={radius / 2}
        image={image}
        alt=""
      />
    </>
  );
};

export default Bubble;
