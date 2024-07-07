import classes from "./NextFloorMenu.module.css";
import { useDispatch } from "react-redux";
import { profileActions } from "../../../../../store/profileSlice";
import { motion } from "framer-motion";
import { game_project_backend } from "declarations/game-project-backend";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function NextFloorMenu({ location, setLocation }) {
  const cave_floor = useSelector(state=>state.profile.cave_floor);
  const forest_floor = useSelector(state=>state.profile.forest_floor);
  const index = useSelector(state=>state.profile.index);
  //location = "cave" / "forest"
  const dispatch = useDispatch();
  const [updateFloor, setUpdateFloor] = useState(false);

  function nextFloor() {
    setUpdateFloor(true);
    dispatch(profileActions.CHANGE_FLOOR(location));
  }
  function leaveDungeon() {
    setUpdateFloor(true);
    dispatch(profileActions.CHANGE_FLOOR(location));
    setLocation("")
  }
  useEffect(()=>{
    async function updateFloorFn(){
      if(location === "cave"){
        await game_project_backend.update_user_cave_floor(index,cave_floor)
      }
      else if(location === "forest"){
        await game_project_backend.update_user_forest_floor(index,forest_floor)
      }
    }
    if(updateFloor)updateFloorFn();
  },[updateFloor])
  return (
    <div className={classes.userOptions}>
      <h2>What is your next move?</h2>
      <motion.p
        className={classes.pointerHover}
        animate={{ x: 0 }}
        whileHover={{ x: 5 }}
        onClick={() => nextFloor()}
      >
        &gt; Go to the next floor
      </motion.p>
      <motion.p
        className={classes.pointerHover}
        animate={{ x: 0 }}
        whileHover={{ x: 5 }}
        onClick={() => leaveDungeon()}
      >
        &gt; Leave the dungeon
      </motion.p>
    </div>
  );
}
