import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store.ts";

export interface CounterState {
  value: number;
  toxicity: number;
  overfishing: number;
  temperature: number;
  autoClickers: number;
  isAutoClickerRunning: boolean;
  buttons: Button[];
  scaleCoeff: number;
  stopOverfishing: boolean;
  stopTemperature: boolean;
}

interface Button {
  id: string;
  show: boolean;
  position: { top: number; left: number };
}

const initialState: CounterState = {
  value: 0,
  toxicity: 20,
  overfishing: 0,
  temperature: 0,
  autoClickers: 0,
  isAutoClickerRunning: false,
  scaleCoeff: 1,
  stopOverfishing: false,
  stopTemperature: false,
  buttons: [
    {
      id: uuidv4(),
      show: true,
      position: {
        top: Math.random() * (window.innerHeight - 50),
        left: Math.random() * (window.innerWidth - 100),
      },
    },
  ],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      state.value += 1;
      state.toxicity -= 2;
      for (let i = 0; i < state.scaleCoeff; i++) {
        state.buttons = state.buttons.filter(
          (button) => button.id != action.payload,
        );
        setTimeout(() => {
          state.buttons.push({
            id: uuidv4(),
            show: true,
            position: {
              top: Math.random() * (window.innerHeight - 50),
              left: Math.random() * (window.innerWidth - 100),
            },
          });
        }, 1000);
      }
    },
    incrementToxicity: (state) => {
      if (state.toxicity > 100) {
        return;
      }
      state.toxicity += 2;
    },
    incrementOverfishing: (state) => {
      if (state.stopOverfishing) return;
      if (state.overfishing > 100) {
        return;
      }
      state.overfishing += 10;
    },
    incrementTemperature: (state) => {
      if (state.stopTemperature) return;
      if (state.temperature > 100) {
        return;
      }
      state.temperature += 10;
    },
    decrement: (state, action) => {
      state.value -= action.payload;
      state.toxicity -= 2;
    },
    resetOverfishing: (state) => {
      state.overfishing = 0;
      state.stopOverfishing = true;
    },
    resetTemperature: (state) => {
      state.temperature = 0;
      state.stopTemperature = true;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    addAutoClicker: (state) => {
      state.autoClickers += 1;
    },
    startAutoClickers: (state) => {
      state.isAutoClickerRunning = true;
    },
    stopAutoClickers: (state) => {
      state.isAutoClickerRunning = false;
    },
    autoClick: (state) => {
      state.value += state.autoClickers;
      state.toxicity -= 2*state.autoClickers;
    },
    removeButton: (state, action: PayloadAction<string>) => {
      const buttonIndex = state.buttons.findIndex(
        (b) => b.id === action.payload,
      );
      if (buttonIndex !== -1) {
        state.buttons[buttonIndex].show = false;
      }
    },
    respawnButton: (state) => {
      state.buttons.push({
        id: uuidv4(),
        show: true,
        position: {
          top: Math.random() * (window.innerHeight - 50),
          left: Math.random() * (window.innerWidth - 100),
        },
      });
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  addAutoClicker,
  startAutoClickers,
  stopAutoClickers,
  autoClick,
  resetOverfishing,
  resetTemperature,
  removeButton,
  respawnButton,
  incrementToxicity,
  incrementOverfishing,
  incrementTemperature,
} = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
