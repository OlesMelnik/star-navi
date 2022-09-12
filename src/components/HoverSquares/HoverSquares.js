import React from "react";

export const HoverSquares = ({ squares }) => {
  return (
    <div
      style={{
        marginTop: 150,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        width: 300,
      }}
    >
      <h3>Hovered Squares</h3>

      {squares &&
        squares.length &&
        squares.map(
          (selected, index) =>
            selected && (
              <div
                style={{
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: "#fbf8e3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "#ffbf00",
                    alignItems: "center",
                  }}
                >
                  row {Math.ceil((index + 1) / 5)} col{" "}
                  {index - 5 * Math.floor(index / 5) + 1}
                </p>
              </div>
            )
        )}
    </div>
  );
};
