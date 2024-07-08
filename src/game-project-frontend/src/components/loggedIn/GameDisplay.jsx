import classes from "./GameDisplay.module.css";
import PlayerMenu from "./playerMenu/PlayerMenu";
import GameScreen from "./screen/GameScreen";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GameDisplay() {
const [location, setLocation] = useState("");
const [deaths, setDeaths] = useState(0);
  return (
    <motion.div
      className={classes.gameDisplayDiv}
      initial={{ opacity: 0,scale:0.5 }}
      animate={{ opacity: 1,scale:1 }}
      transition={{ delay: 0.5, duration: 1 }}
      key={`GameDisplay${deaths}`}
    >
      <PlayerMenu />
      <GameScreen location={location} setLocation={setLocation} setDeaths={setDeaths}/>
    </motion.div>
  );
}
