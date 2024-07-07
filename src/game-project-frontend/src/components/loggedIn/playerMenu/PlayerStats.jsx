import classes from './PlayerStats.module.css';
import { useSelector } from "react-redux";

export default function PlayerStats() {
    const userGold = useSelector((state) => state.profile.gold);
    const userPower = useSelector((state) => state.profile.power);
    const userLevel = useSelector((state) => state.profile.level);
    const userHealth = useSelector((state) => state.profile.health);
    const userMaxHealth = useSelector((state) => state.profile.max_health);

    const healthPercentage = Math.floor((userHealth / userMaxHealth) * 100);

    return <div className={classes.playerStatsDiv}>
        <p>Gold: {userGold} | Power: {userPower}</p>
        <p>Health:</p>
        <div className={classes.healthBar}><div className={classes.healthProgress} style={{width: `${healthPercentage}%`}}/></div>
        <p>Experience:</p>
        <div className={classes.levelBar}><div className={classes.levelProgress} style={{width: `${userLevel}%`}}/></div>
    </div>
}