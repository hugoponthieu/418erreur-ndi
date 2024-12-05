import { useState, useRef, useEffect } from "react";
import { increment } from "@/features/counter/counterSlice.ts";
import { useAppDispatch, useAppSelector } from "@/app/hooks.ts";
import { RootState } from "@/app/store.ts";

export function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  const startTimeRef = useRef(Date.now());
  const [gameTime, setGameTime] = useState(0);

  const [buttons, setButtons] = useState<Array<{id: number, show: boolean, position: {top: number, left: number}}>>([
    {
      id: 1, 
      show: true, 
      position: {
        top: Math.random() * (window.innerHeight - 50),
        left: Math.random() * (window.innerWidth - 100)
      }
    }
  ]);

  // Mise à jour temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now();
      setGameTime(Math.floor((currentTime - startTimeRef.current) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const incrementCounter = (buttonId: number) => {
    dispatch(increment());

    setButtons(prevButtons => 
      prevButtons.map(button => 
        button.id === buttonId 
          ? { ...button, show: false } 
          : button
      )
    );

    // Temps aléatoire avant l'apparition du prochain bouton
    setTimeout(() => {
      setButtons(prevButtons => {
        const newButton = {
          id: Math.max(...prevButtons.map(b => b.id)) + 1,
          show: true,
          position: {
            top: Math.random() * (window.innerHeight - 50),
            left: Math.random() * (window.innerWidth - 100)
          }
        };

        return prevButtons.map(button => 
          button.id === buttonId 
            ? { 
                ...button, 
                show: true,
                position: {
                  top: Math.random() * (window.innerHeight - 50),
                  left: Math.random() * (window.innerWidth - 100)
                }
              }
            : button
        ).concat(newButton);
      });
    }, Math.random() * 5000); // Entre 0 et 5 secondes
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <h1>Compteur: {count}</h1>
      <p>Temps de jeu: {gameTime} secondes</p>
      {buttons.map(button => (
        button.show && (
          <button 
            key={button.id}
            onClick={() => incrementCounter(button.id)}
            style={{
              position: 'absolute', 
              top: button.position.top, 
              left: button.position.left
            }}
          >
            Plastique
          </button>
        )
      ))}
    </div>
  );
}

export default Counter;