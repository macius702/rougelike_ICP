import { motion } from "framer-motion";
import classes from "./PlayerMenu.module.css";
import PlayerPortrait from "./PlayerPortrait";
import PlayerStats from "./PlayerStats";
import { useState } from "react";

export default function PlayerMenu() {
  const [selectedPortrait, setSelectedPortrait] = useState(0);

  return (
    <motion.div
      className={classes.playerMenuDiv}
      key="playerMenu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
    >
      <PlayerPortrait
        selectedPortrait={selectedPortrait}
        setSelectedPortrait={setSelectedPortrait}
      />
      <PlayerStats
        selectedPortrait={selectedPortrait}
        setSelectedPortrait={setSelectedPortrait}
      />
    </motion.div>
  );
}
