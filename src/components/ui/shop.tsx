import {
  addAutoClicker,
  decrement,
  startAutoClickers,
} from "@/features/counter/counterSlice";
import { useState } from "react";
import { Informations } from "@/lib/infos";
import { MoneyIcon } from "../icons/money";
import { RetroButton } from "./button";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Dialog, DialogTrigger } from "./dialog";
import { RetroDialog } from "./retro-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

interface ShopItemProps {
  currentAmount: number;
  name: string;
  price: number;
  informations: Informations;
}

interface KeyProps extends ShopItemProps {
  key: number;
}

interface ShopTableProps {
  title: string;
  items: ShopItemProps[];
}

function ShopItem({ currentAmount, name, price, informations }: KeyProps) {
  const sellPrice = price * 0.7;
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  const buyItem = () => {
    if (count >= price) {
      // Déduire le prix
      dispatch(decrement(price));
      dispatch(addAutoClicker());
      dispatch(startAutoClickers());
    }
  };
  return (
    <div className="flex flex-row justify-between p-1 group hover:bg-retropink m-2 items-center">
      <div className="flex flex-row justify-start items-center gap-10">
        <p className="font-pressstart text-white text-md">{currentAmount}x</p>
        <Dialog>
          <DialogTrigger>
            <div className="flex flex-col max-w-[300px]">
              <p className="font-pressstart text-retropink group-hover:text-black text-md text-left">
                {name}
              </p>
              <div className="flex flex-row gap-1">
                <MoneyIcon color="white" size={20} />
                <p className="font-pressstart text-white text-sm">{price}</p>
              </div>
            </div>
          </DialogTrigger>
          <RetroDialog informations={informations} />
        </Dialog>
      </div>
      <div className="flex flex-row gap-2">
        <RetroButton
          particle="💰"
          legend={`Buy for ${price}`}
          onClick={() => buyItem()}
        >
          <p className="font-pressstart">Buy</p>
        </RetroButton>
      </div>
    </div>
  );
}

export function ShopTable({ title, items }: ShopTableProps) {
  const [isOpen, setIsOpen] = useState(false); // Dropdown toggle state

  return (
    <div className="border-x-white pixel-border-lg-white border-b-white backdrop-blur">
      {/* Title and Dropdown Toggle */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full border-x-white pixel-border-lg-white border-b-white backdrop-blur">
            <div
              className="w-full bg-white py-2 flex items-center justify-between cursor-pointer"
              onClick={() => setIsOpen(!isOpen)} // Toggle visibility
            >
              <h3 className="ml-1 text-black font-pressstart uppercase font-extrabold text-sm">
                {title}
              </h3>
              <div className="mr-4 font-pressstart text-retropink">
                <p className="pixel-border-white border-red w-fit">
                  {isOpen ? "▲" : "▼"} {/* Icon for dropdown toggle */}
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-pressstart text-xs">Expand</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Conditional Rendering of Items */}
      {isOpen && (
        <div>
          {items.map((props, index) => (
            <ShopItem
              currentAmount={props.currentAmount}
              informations={props.informations}
              name={props.name}
              price={props.price}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
