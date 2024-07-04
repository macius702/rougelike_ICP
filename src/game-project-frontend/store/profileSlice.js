import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    gold: 0,
    power: 0,
  },
  reducers: {
    LOGIN(state, action) {
        const name= action.payload.name;
        const gold= action.payload.gold;
        const power= action.payload.power;
        state.name = name;
        state.gold = gold;
        state.power = power;
    },
    CHANGE_GOLD(state, action) {
      const newGold = state.gold + action.payload;
      state.gold = newGold;
    },
    CHANGE_POWER(state, action) {
      const newPower = state.power + action.payload;
      state.power = newPower;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
