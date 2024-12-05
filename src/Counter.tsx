import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [buttons, setButtons] = useState<{ id: number; top: number; left: number; }[]>([]);
  const [time, setTime] = useState(0);
  const [spawnProbability, setSpawnProbability] = useState(4000);

  useEffect(() => {
    const buttonInterval = setInterval(() => {
      const newButton = {
        id: Date.now(),
        top: Math.random() * (window.innerHeight - 50),
        left: Math.random() * (window.innerWidth - 100)
      };
      setButtons(prevButtons => [...prevButtons, newButton]);
      

      // Augmente la probabilité toutes les 20 secondes
      if (time % 20 === 0 && time > 0) {
        setSpawnProbability(prev => prev / 2);
      }
    }, Math.random() * spawnProbability);

    const timerInterval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(buttonInterval);
      clearInterval(timerInterval);
    };
  }, [time, spawnProbability]);

  const handleButtonClick = (buttonId: number) => {
    setCount(prevCount => prevCount + 1);
    setButtons(prevButtons => 
      prevButtons.filter(button => button.id !== buttonId)
    );
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <h1>Compteur: {count}</h1>
      <h2>Time: {time} secondes</h2>
      {buttons.map((button) => (
        <button 
          key={button.id}
          onClick={() => handleButtonClick(button.id)}
          style={{
            position: 'absolute', 
            top: button.top, 
            left: button.left
          }}
        >
          plastique
        </button>
      ))}
    </div>
  );
}

export default Counter;