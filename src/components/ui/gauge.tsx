import React from "react";

interface GaugeProps {
  color: "green" | "blue" | "red";
  percentage: number;
  label: string;
}

export function Gauge({ color, percentage, label }: GaugeProps) {
  //percentage is between 0 and 100, max number of bars is 10
  const nbBars = Math.floor(percentage / 10);
  const bars: React.ReactNode[] = [];
  for (let i = 0; i < nbBars; i++) {
    bars.push(<div className="h-4 flex-1 bg-red-600"></div>);
  }

  for (let k = 0; k < nbBars; k++) {
    bars.push(<div className="h-2 flex-1 bg-transparent"></div>);
  }
  return (
    <div className="pixel-border-lg border-red w-fit">
      <div className="flex flex-row w-[100px] gap-[2px] justify-start p-1">
        {bars.map((bar) => bar)}
      </div>
    </div>
  );
}
