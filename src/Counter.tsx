import { useState, useRef, useEffect } from "react";
import { decrement, increment } from "@/features/counter/counterSlice.ts";
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

  const [buttons, setButtons] = useState<
    Array<{
      id: number;
      show: boolean;
      position: { top: number; left: number };
    }>
  >([
    {
      id: 1,
      show: true,
      position: {
        top: Math.random() * (window.innerHeight - 50),
        left: Math.random() * (window.innerWidth - 100),
      },
    },
  ]);

  const [shopItems, setShopItems] = useState<ShopItem[]>([
    {
      id: 1,
      name: "Bouton Speed Boost",
      price: 10,
      effect: () => {
        // Réduire le temps d'apparition des boutons
      },
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now();
      setGameTime(Math.floor((currentTime - startTimeRef.current) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const incrementCounter = (buttonId: number) => {
    dispatch(increment());

    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === buttonId ? { ...button, show: false } : button,
      ),
    );

    setTimeout(() => {
      setButtons((prevButtons) => {
        const newButton = {
          id: Math.max(...prevButtons.map((b) => b.id)) + 1,
          show: true,
          position: {
            top: Math.random() * (window.innerHeight - 50),
            left: Math.random() * (window.innerWidth - 100),
          },
        };

        return prevButtons
          .map((button) =>
            button.id === buttonId
              ? {
                  ...button,
                  show: true,
                  position: {
                    top: Math.random() * (window.innerHeight - 50),
                    left: Math.random() * (window.innerWidth - 100),
                  },
                }
              : button,
          )
          .concat(newButton);
      });
    }, Math.random() * 5000);
  };

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
        {buttons.map(
          (button) =>
            button.show && (
              <button
                key={button.id}
                onClick={() => incrementCounter(button.id)}
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
