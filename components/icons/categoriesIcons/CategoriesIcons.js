import React from "react";
import IconsSVG from "./CategoriesIcons.svg";

function CategoriesIcons({ name, color, size, className }) {
  return (
    <svg fill={color} stroke={color} width={size} height={size}>
      <use href={`${IconsSVG.src}#${name}`} />
    </svg>
  );
}

export default CategoriesIcons;
