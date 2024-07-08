import classes from "./PlayerMenu.module.css";
import PlayerPortrait from "./PlayerPortrait";
import PlayerStats from "./PlayerStats";
import { useState } from "react";

export default function PlayerMenu() {
  const [selectedPortrait, setSelectedPortrait] = useState(0);
  
  return (
    <div className={classes.playerMenuDiv}>
      <PlayerPortrait selectedPortrait={selectedPortrait} setSelectedPortrait={setSelectedPortrait}/>
      <PlayerStats selectedPortrait={selectedPortrait} setSelectedPortrait={setSelectedPortrait}/>
    </div>
  );
}
