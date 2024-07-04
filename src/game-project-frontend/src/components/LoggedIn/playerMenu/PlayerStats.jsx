import classes from './PlayerStats.module.css';
import { useSelector } from "react-redux";

export default function PlayerStats() {
    const userGold = useSelector((state) => state.profile.gold);
    const userPower = useSelector((state) => state.profile.power);
    const userLevel = useSelector((state) => state.profile.level);

    return <div className={classes.playerStatsDiv}>
        <p>Gold: {userGold} | Power: {userPower}</p>
        <p>Experience:</p>
        <div className={classes.levelBar}><div className={classes.levelProgress} style={{width: `${userLevel}%`}}/></div>
    </div>
}