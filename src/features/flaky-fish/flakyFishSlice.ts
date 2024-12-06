import { createSlice } from "@reduxjs/toolkit/react";

export interface FlakyFishState {
    y: number
    r: number
}

const initialState: FlakyFishState = {
    y: 250,
    r: 0,
}

export const flakyFishSlice = createSlice({
    name: "flakyFish",
    initialState,
    selectors: { getFishState: (state) => state },
    reducers: {
        fly: (state) => {
            state.y = state.y - 30
            state.r = - 30
        },
        fall: (state) => {
            state.y = state.y + 20
            state.r = 0
        },
        gameOverFish: (state) => {
            state.y = initialState.y
            state.r = initialState.r
        }
    }
});

// Action creators are generated for each case reducer function
export const { fly, fall, gameOverFish } = flakyFishSlice.actions
export const { getFishState } = flakyFishSlice.selectors
export default flakyFishSlice.reducer