import { MoneyIcon } from "../icons/money";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";


export function MoneyCounter() {
  const count = useAppSelector((state: RootState) => state.counter.value);

  return (
    <div className="flex flex-row gap-2 items-center">
      <MoneyIcon color="white" size={25} />
      <p className="font-pressstart text-white">{count}</p>
    </div>
  );
}
