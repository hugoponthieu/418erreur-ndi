import { MoneyIcon } from "../icons/money";
import { RetroButton } from "./button";

interface ShopItemProps {
  currentAmount: number;
  name: string;
  price: number;
}
interface KeyProps extends ShopItemProps {
  key: number;
}

interface ShopTableProps {
  title: string;
  items: ShopItemProps[];
}

function ShopItem({ currentAmount, name, price }: KeyProps) {
  const sellPrice = price * 0.7;

  return (
    <div className="flex flex-row justify-between p-1 group hover:bg-pink m-2 items-center">
      <div className="flex flex-row justify-start items-center gap-10">
        <p className="font-pressstart">{currentAmount}x</p>
        <div className="flex flex-col">
          <p className="font-pressstart text-pink group-hover:text-black text-lg">
            {name}
          </p>
          <div className="flex flex-row gap-1">
            <MoneyIcon color="black" size={20} />
            <p className="font-pressstart">{price}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <RetroButton particle="✅" legend={`Buy for ${price}`}>
          <p className="font-pressstart">+</p>
        </RetroButton>
        <RetroButton particle="💸" legend={`Sell for ${sellPrice}`}>
          <p className="font-pressstart">-</p>
        </RetroButton>
      </div>
    </div>
  );
}

export function ShopTable({ title, items }: ShopTableProps) {
  return (
    <div className=" border-x-black pixel-border-lg border-b-black">
      <div className="w-full bg-black py-2">
        <h3 className="ml-1 text-white font-pressstart uppercase font-extrabold ">
          {title}
        </h3>
      </div>
      {items.map((props, index) => {
        return (
          <ShopItem
            currentAmount={props.currentAmount}
            name={props.name}
            price={props.price}
            key={index}
          />
        );
      })}
    </div>
  );
}
