import { Progress } from "./progress";

interface OldProgressProps {
  value: number;
}

export function OldProgress({ value }: OldProgressProps) {
  return (
    <Progress
      value={value}
      className="w-full rounded-none h-6 border-b-2 border-b-white border-t-2 border-t-black border-l-2 border-l-black border-r-2 border-r-white"
    />
  );
}
