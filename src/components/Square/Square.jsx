import React from "react";

export const Square = ({ size, selected, onHover }) => {
  return (
    <div
      onMouseOver={onHover}
      style={{
        width: size,
        height: size,
        backgroundColor: selected ? "#03a8f4" : "white",
      }}
    ></div>
  );
};
