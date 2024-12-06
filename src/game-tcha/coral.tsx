import BottomPipeImage from "./images/pipe-bottom.png";
import TopPipeImage from "./images/pipe-top.png";

interface CoralProps {
  x: number;
  corals: Array<{ topHeight: number }>;
}

export function Coral({ x, corals }: CoralProps) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {corals.map(({ topHeight }, i) => (
        <div
          key={`pipe-${i}`}
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: x + i * 200,
              width: 52,
              height: topHeight,
              background: `url(${TopPipeImage})`,
              backgroundPosition: "bottom",
              transition: "left 300ms",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: topHeight + 100,
              left: x + i * 200,
              width: 52,
              height: 512 - topHeight - 100,
              background: `url(${BottomPipeImage})`,
              transition: "left 300ms",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}
