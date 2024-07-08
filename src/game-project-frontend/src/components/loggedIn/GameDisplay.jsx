import classes from "./GameDisplay.module.css";
import PlayerMenu from "./playerMenu/PlayerMenu";
import GameScreen from "./screen/GameScreen";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GameDisplay() {
const [location, setLocation] = useState("");
  return (
    <motion.div
      className={classes.gameDisplayDiv}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <PlayerMenu />
      <GameScreen location={location} setLocation={setLocation}/>
    </motion.div>
  );
}
