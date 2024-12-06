import { MoneyIcon } from "../icons/money";
import { RetroButton } from "./button";

interface ShopItemProps {
  currentAmount: number;
  name: string;
  price: number;
  stats: {};
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
    <div className="flex flex-row justify-between p-1 group hover:bg-retropink m-2 items-center ">
      <div className="flex flex-row justify-start items-center gap-10">
        <p className="font-pressstart text-white">{currentAmount}x</p>
        <div className="flex flex-col  max-w-[300px]">
          <p className="font-pressstart text-retropink group-hover:text-black text-lg">
            {name}
          </p>
          <div className="flex flex-row gap-1">
            <MoneyIcon color="white" size={20} />
            <p className="font-pressstart text-white">{price}</p>
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
    <div className=" border-x-white pixel-border-lg-white border-b-white backdrop-blur">
      <div className="w-full bg-white py-2">
        <h3 className="ml-1 text-black font-pressstart uppercase font-extrabold ">
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
