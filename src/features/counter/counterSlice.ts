import { Button } from '@/components/ui/button';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store.ts'

export interface CounterState {
    value: number
    autoClickers: number;
    isAutoClickerRunning: boolean;
    buttons: Button[];
}

interface Button {
    id: number;
    show: boolean;
    position: { top: number; left: number };
}

const initialState: CounterState = {
    value: 0,
    autoClickers: 0,
    isAutoClickerRunning: false,
    buttons: [
        {
            id: 1,
            show: true,
            position: {
                top: Math.random() * (window.innerHeight - 50),
                left: Math.random() * (window.innerWidth - 100),
            },
        },
    ],
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: (state, action) => {
            state.value -= action.payload
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
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
        },
        removeButton: (state, action: PayloadAction<number>) => {
            const buttonIndex = state.buttons.findIndex((b) => b.id === action.payload);
            if (buttonIndex !== -1) {
              state.buttons[buttonIndex].show = false;
            }
        },
        respawnButton: (state) => {
            const newId = Math.max(...state.buttons.map((b) => b.id)) + 1;
            state.buttons.push({
              id: newId,
              show: true,
              position: {
                top: Math.random() * (window.innerHeight - 50),
                left: Math.random() * (window.innerWidth - 100),
              },
            });
        },
    }
})

export const { 
    increment, 
    decrement, 
    incrementByAmount, 
    addAutoClicker,
    startAutoClickers,
    stopAutoClickers,
    autoClick,
    removeButton,
    respawnButton,    
} = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer