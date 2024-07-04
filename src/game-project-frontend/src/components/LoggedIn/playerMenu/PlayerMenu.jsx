import classes from "./PlayerMenu.module.css";
import PlayerPortrait from "./PlayerPortrait";
import PlayerStats from "./PlayerStats";

export default function PlayerMenu() {
  
  return (
    <div className={classes.playerMenuDiv}>
      <PlayerPortrait />
      <PlayerStats/>
    </div>
  );
}
