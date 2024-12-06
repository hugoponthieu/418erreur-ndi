import { MoneyIcon } from "../icons/money";

interface MoneyCounterProps {
  count: number;
}
export function MoneyCounter({ count }: MoneyCounterProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <MoneyIcon color="black" size={25} />
      <p className="font-pressstart">{count}</p>
    </div>
  );
}
