import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    index: -1,
    name: "",
    gold: 0,
    power: 0,
    level: 0,
  },
  reducers: {
    LOGIN(state, action) {
      const name = action.payload.name;
      const gold = action.payload.gold;
      const power = action.payload.power;
      const index = action.payload.index;
      state.index = index;
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
    CHANGE_LEVEL(state, action) {
      const level = state.level + action.payload;
      if (level >= 100) {
        const level_ups = Math.floor(level / 100);

        const newPower = state.power + (level_ups * 10);
        state.power = newPower;

        level = level % 100;
      }
      state.level = level;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
