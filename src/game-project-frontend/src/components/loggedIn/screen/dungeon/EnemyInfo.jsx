import classes from "./EnemyInfo.module.css";
import poisoned_effect from "../../../../../public/poisoned_effect.png";
import stunned_effect from "../../../../../public/stunned_effect.png";

export default function EnemyInfo({
  health,
  maxHealth,
  powerTest,
  stun,
  poison,
}) {
  const healthPercentage = Math.floor(health / maxHealth * 100);
  return (
    <div className={classes.enemyInfo}>
      <p>Enemy:</p>
      <div className={classes.healthBar}>
        <div
          className={classes.healthProgress}
          style={{ width: `${healthPercentage}%` }}
        />
      </div>
      {poison && <img src={poisoned_effect} alt="poisoned" />}
      {stun && <img src={stunned_effect} alt="stunned" />}
      <p>power: {powerTest}</p>
    </div>
  );
}
