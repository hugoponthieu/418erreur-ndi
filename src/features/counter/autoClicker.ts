import { Middleware } from "@reduxjs/toolkit";
import {
  autoClick,
  startAutoClickers,
  stopAutoClickers,
  removeButton,
  respawnButton,
} from "./counterSlice";

const autoClickerMiddleware: Middleware = (store) => {
  let intervalId: NodeJS.Timeout | null = null;

  return (next) => (action) => {
    if (startAutoClickers.match(action)) {
      if (intervalId === null) {
        intervalId = setInterval(() => {
          const state = store.getState();
          const { buttons } = state.counter;

          // Trouver un bouton visible
          const visibleButton = buttons.find(
            (button: { id: number; show: boolean }) => button.show,
          );
          console.log(visibleButton);

          if (visibleButton) {
            // Simuler un clic : incrémenter et retirer le bouton
            store.dispatch(autoClick()); // Ajouter des points
            store.dispatch(removeButton(visibleButton.id)); // Cacher le bouton

            // Ajouter un nouveau bouton après un délai
            setTimeout(() => {
              store.dispatch(respawnButton());
            }, Math.random() * 5000);
          }
        }, 1000); // 1 clic par seconde par AutoClicker
      }
    } else if (stopAutoClickers.match(action)) {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    return next(action);
  };
};

export default autoClickerMiddleware;
