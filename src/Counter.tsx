import {increment} from "@/features/counter/counterSlice.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {RootState} from "@/app/store.ts";
import {useState} from "react";

export function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value); // Récupération du compteur global depuis Redux
  const dispatch = useAppDispatch();

  const [showButton, setShowButton] = useState(true);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const incrementCounter = () => {
    dispatch(increment());
    setShowButton(false);

    const newTop = Math.random() * (window.innerHeight - 50);
    const newLeft = Math.random() * (window.innerWidth - 100);

    setTimeout(() => {
      setButtonPosition({ top: newTop, left: newLeft });
      setShowButton(true);
    }, Math.random() * 2000);
  };

  return (
      <div style={{ position: 'relative', height: '100vh' }}>
        <h1>Compteur: {count}</h1>
        {showButton && (
            <button
                onClick={incrementCounter}
                style={{
                  position: 'absolute',
                  top: buttonPosition.top,
                  left: buttonPosition.left,
                }}
            >
              Incrémenter
            </button>
        )}
      </div>
  );
}

export default Counter;