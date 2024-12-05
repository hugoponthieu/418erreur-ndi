import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const incrementCounter = () => {
    setCount(count + 1);
    setShowButton(false);
    
    // Position aléatoire pour le bouton
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
            left: buttonPosition.left
          }}
        >
          Incrémenter
        </button>
      )}
    </div>
  );
}

export default Counter;