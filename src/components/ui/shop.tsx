import { MoneyIcon } from "../icons/money";
import { RetroButton } from "./button";

interface ShopItemProps {
  currentAmount: number;
  name: string;
  price: number;
}

interface ShopTableProps {
  title: string;
  items: ShopItemProps[];
}

function ShopItem({ currentAmount, name, price }: ShopItemProps) {
  const sellPrice = price * 0.7;
  return (
    <div className="flex flex-row justify-between">
      <p className="font-pressstart">{currentAmount}x</p>
      <div className="flex flex-col">
        <p className="font-pressstart">{name}</p>
        <div className="flex flex-row">
          <p className="font-pressstart">{price}</p>
          <MoneyIcon color="black" size={20} />
        </div>
      </div>
      <div className="flex flex-row gaps-2">
        <RetroButton legend={`Buy for ${price}`}>
          <p className="font-pressstart">+</p>
        </RetroButton>
        <RetroButton legend={`Sell for ${sellPrice}`}>
          <p className="font-pressstart">-</p>
        </RetroButton>
      </div>
    </div>
  );
}

export function ShopTable({ title, items }: ShopTableProps) {
  return (
    <div>
      <h3>{title}</h3>
      {items.map((props) => {
        return (
          <ShopItem
            currentAmount={props.currentAmount}
            name={props.name}
            price={props.price}
          />
        );
      })}
    </div>
  );
}
