import { useState, useRef, useEffect } from "react";
import {
  addAutoClicker,
  decrement,
  increment,
  respawnButton,
  startAutoClickers,
} from "@/features/counter/counterSlice.ts";
import { useAppDispatch, useAppSelector } from "@/app/hooks.ts";
import { RootState } from "@/app/store.ts";
import { ShopTable } from "./components/ui/shop";

interface ShopItem {
  id: number;
  name: string;
  price: number;
  effect: () => void;
}

export function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  const startTimeRef = useRef(Date.now());
  const [gameTime, setGameTime] = useState(0);
  const autoClickers = useAppSelector(
    (state: RootState) => state.counter.autoClickers,
  );

  const buttons = useAppSelector((state: RootState) => state.counter.buttons);

  const [shopItems, setShopItems] = useState<ShopItem[]>([
    {
      id: 1,
      name: "Get AutoClicker",
      price: 10,
      effect: () => {
        dispatch(addAutoClicker());
        dispatch(startAutoClickers());
      },
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now();
      setGameTime(Math.floor((currentTime - startTimeRef.current) / 1000));
      setTimeout(() => {
        dispatch(respawnButton());
      }, Math.random() * 5000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const buyItem = (item: ShopItem) => {
    if (count >= item.price) {
      // Déduire le prix
      dispatch(decrement(item.price));
      item.effect();
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 2, position: "relative" }}>
        <h1>Compteur: {count}</h1>
        <p>Temps de jeu: {gameTime} secondes</p>
        <p>AutoClickers : {autoClickers}</p>
        {buttons.map(
          (button) =>
            button.show && (
              <button
                key={button.id}
                onClick={() => {
                  dispatch(increment(button.id));
                }}
                style={{
                  position: "absolute",
                  top: button.position.top,
                  left: button.position.left,
                }}
              >
                Incrémenter {button.id}
              </button>
            ),
        )}
      </div>

      <div style={{ flex: 1, borderLeft: "1px solid black", padding: "20px" }}>
        <ShopTable
          title="Magasin"
          items={shopItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            currentAmount: count,
            effect: item.effect,
          }))}
        />
        <h2>Magasin</h2>
        {shopItems.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            <p>
              {item.name} - Prix: {item.price}
            </p>
            <button onClick={() => buyItem(item)} disabled={count < item.price}>
              Acheter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Counter;
