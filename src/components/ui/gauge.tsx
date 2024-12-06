import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import React from "react";

interface GaugeProps {
  color: "green" | "blue" | "pink";
  percentage: number;
  label: string;
}

export function Gauge({ color, percentage, label }: GaugeProps) {
  //percentage is between 0 and 100, max number of bars is 10
  const nbBars = Math.floor(percentage / 10);
  const bars: React.ReactNode[] = [];
  for (let i = 0; i < nbBars; i++) {
    switch (color) {
      case "green":
        bars.push(<div key={`filled-green-${i}`} className={`h-4 flex-1 bg-retrogreen`}></div>);
        break;
      case "blue":
        bars.push(<div key={`filled-blue-${i}`} className="h-4 flex-1 bg-retroblue"></div>);
        break;
      default:
        bars.push(<div key={`filled-pink-${i}`} className="h-4 flex-1 bg-retropink"></div>);
        break;
    }
  }

  for (let k = 0; k < 10 - nbBars; k++) {
    bars.push(<div key={`empty-${k}`} className="h-4 flex-1 bg-transparent"></div>);
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="pixel-border border-red w-fit">
            <div className="flex flex-row w-[100px] gap-[2px] justify-start p-1">
              {bars.map((bar) => bar)}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-pressstart text-xs">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
