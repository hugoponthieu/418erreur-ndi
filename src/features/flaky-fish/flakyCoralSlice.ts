import { createSlice } from '@reduxjs/toolkit';

interface Coral {
    topHeight: number;
}

interface FlakyCoralState {
    x: number;
    corals: Coral[];
}

const initialState: FlakyCoralState = {
    x: 300,
    corals: [],
};

const flakyCoralSlice = createSlice({
    name: 'flakyCoral',
    initialState,
    selectors: { getCoralState: (state) => state },

    reducers: {
        running(state) {
            if (!state.corals.length) {
                return state;
            }
            state.x -= 10;
        },
        generate(state) {
            const topHeight = Math.round(Math.random() * 200) + 40;
            state.corals.push({ topHeight });
        },
        gameOverCoral(state) {
            state.x = initialState.x;
            state.corals = initialState.corals;
        },
    },
});

export const { running, generate, gameOverCoral } = flakyCoralSlice.actions;
export const { getCoralState } = flakyCoralSlice.selectors;
export default flakyCoralSlice.reducer;