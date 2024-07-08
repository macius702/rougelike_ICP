import classes from "./EnemyInfo.module.css";
import poisoned_effect from "../../../../../public/poison_pixel.png";
import stunned_effect from "../../../../../public/stun_pixel.png";
import { motion } from "framer-motion";

export default function EnemyInfo({
  health,
  maxHealth,
  power,
  stun,
  poison,
}) {
  const healthPercentage = Math.floor(health / maxHealth * 100);
  return (
    <div className={classes.enemyInfo}>
      <h2>Enemy:</h2>
      <div className={classes.healthBar}>
        <motion.div
          className={classes.healthProgress}
          style={{ width: `${healthPercentage}%` }}
          layout
        />
      </div>
      <div className={classes.status}>
      {poison > 0 && <img src={poisoned_effect} alt="poisoned" />}
      {stun && <img src={stunned_effect} alt="stunned" />}
      </div>
      <p>Power:</p>
      <h2 className={classes.difficulty}>{power > 1.5 ? <span className={classes.difficultyMedium}>Medium</span> : power > 3.0 ? <span className={classes.difficultyHard}>Hard</span> : <span className={classes.difficultyEasy}>Easy</span>}</h2>
    </div>
  );
}
