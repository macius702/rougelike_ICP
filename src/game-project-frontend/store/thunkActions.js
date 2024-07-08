import { profileActions } from './profileSlice';
import { game_project_backend } from "declarations/game-project-backend";

export const updateGold = (amount) => async (dispatch, getState) => {
  dispatch(profileActions.CHANGE_GOLD(amount));
  const { index, gold } = getState().profile;
  await game_project_backend.update_user_gold(index, gold);
};

export const updateLevel = (amount) => async (dispatch, getState) => {
  dispatch(profileActions.CHANGE_LEVEL(amount));
  const { index, level, power } = getState().profile;
  await game_project_backend.update_user_power(index, power);
  await game_project_backend.update_user_experience(index, level);
};
export const updateHealth = (amount) => async (dispatch, getState) => {
    dispatch(profileActions.TAKE_DAMAGE(amount));
    const { index, health } = getState().profile;
    await game_project_backend.update_user_health(index, health);
  };
