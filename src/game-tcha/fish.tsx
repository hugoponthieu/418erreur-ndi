import BirdImage from "./images/bird.png";

interface BirdProps {
  y: number;
  r: number;
}

export function Fish({ y, r }: BirdProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 120,
        width: 38,
        height: 38 ,
        background: `url(${BirdImage})`,
        transform: `rotate(${r}deg)`,
        transition: "transform 100ms, top 300ms",
      }}
    ></div>
  );
}
