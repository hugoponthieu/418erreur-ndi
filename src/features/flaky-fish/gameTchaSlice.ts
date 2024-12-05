import { createSlice } from '@reduxjs/toolkit';

interface GameState {
    status: string;
}

const initialState: GameState = {
    status: '',
};

const gameTchaSlice = createSlice({
    name: 'gameTcha',
    initialState,
    selectors: { getTchaState: (state) => state },

    reducers: {
        start(state) {
            state.status = 'playing';
        },
        gameOverTcha(state) {
            state.status = 'game-over';
        },
    },
});

export const { start, gameOverTcha } = gameTchaSlice.actions;
export const { getTchaState } = gameTchaSlice.selectors;
export default gameTchaSlice.reducer;