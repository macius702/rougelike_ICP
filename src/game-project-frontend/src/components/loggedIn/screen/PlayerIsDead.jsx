import { useDispatch, useSelector } from "react-redux";
import classes from "./PlayerIsDead.module.css";
import { game_project_backend } from "declarations/game-project-backend";
import { profileActions } from "../../../../store/profileSlice";
import { motion } from "framer-motion";

export default function PlayerIsDead({ setLocation, setDeaths }) {
  const dispatch = useDispatch();

  const cave_floor = useSelector((state) => state.profile.cave_floor);
  const forest_floor = useSelector((state) => state.profile.forest_floor);
  const power = useSelector((state) => state.profile.power);
  const gold = useSelector((state) => state.profile.gold);

  const index = useSelector((state) => state.profile.index);
  const name = useSelector((state) => state.profile.name);
  async function resetStats() {
    dispatch(
      profileActions.LOGIN({
        index,
        name,
        gold: 15,
        power: 1,
        cave_floor: 1,
        forest_floor: 1,
        level: 0,
        health: 34,
      })
    );
    dispatch(profileActions.CHANGE_MAX_HEALTH(34));
    dispatch(profileActions.REFILL_ABILITY_NUMBER());
    await game_project_backend.update_user_power(index, 1);
    await game_project_backend.update_user_portrait(index, 0);
    await game_project_backend.update_user_health(index, 34);
    await game_project_backend.update_user_gold(index, 15);
    await game_project_backend.update_user_forest_floor(index, 1);
    await game_project_backend.update_user_cave_floor(index, 1);
    await game_project_backend.update_user_experience(index, 0);
  }
  resetStats();
  function startAgain() {
    setDeaths((prev) => prev + 1);
    setLocation("");
  }

  return (
    <motion.div
      className={classes.deathScreen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
      >
        You Died!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
      >
        <span className={classes.scoreTitle}>Score:</span>
        <br />
        Cave Floor: {cave_floor}
        <br />
        Forest Floor: {forest_floor}
        <br />
        Gold: {gold}
        <br />
        Power: {power}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
        onClick={() => startAgain()}
        className={classes.tryAgainText}
      >
        Try again
      </motion.p>
    </motion.div>
  );
}
