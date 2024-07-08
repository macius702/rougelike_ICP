import classes from "./PlayerStats.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import knight_small from "../../../../public/knight_small.png";
import ranger_small from "../../../../public/ranger_small.png";
import mage_small from "../../../../public/mage_small.png";
import { profileActions } from "../../../../store/profileSlice";

export default function PlayerStats({selectedPortrait,setSelectedPortrait}) {
  const userGold = useSelector((state) => state.profile.gold);
  const userPower = useSelector((state) => state.profile.power);
  const userLevel = useSelector((state) => state.profile.level);
  const userHealth = useSelector((state) => state.profile.health);
  const userMaxHealth = useSelector((state) => state.profile.max_health);

  const healthPercentage = Math.floor((userHealth / userMaxHealth) * 100);

  const abilities = useSelector((state) => state.profile.abilities);

  const dispatch = useDispatch();

  function changeSelectedImage(value) {
      setSelectedPortrait(value);
      dispatch(profileActions.CHANGE_CLASS(value));
  }

  return (
    <div className={classes.playerStatsDiv}>
      <p>
        Gold: {userGold} | Power: {userPower}
      </p>
      <p>Health:</p>
      <div className={classes.healthBar}>
        <motion.div
          className={classes.healthProgress}
          style={{ width: `${healthPercentage}%` }}
          layout
        />
      </div>
      <p>Experience:</p>
      <div className={classes.levelBar}>
        <div
          className={classes.levelProgress}
          style={{ width: `${userLevel}%` }}
        />
      </div>
      <div className={classes.remainingAbilitiesDiv}>
        <div className={classes.characterRemainingAbilities} onClick={()=>changeSelectedImage(0)}>
          <img src={knight_small} alt="knight icon" />
          <p>
            [{" "}
            <span
              className={
                abilities[0][0] === 20
                  ? classes.full
                  : abilities[0][0] > 5
                  ? classes.half
                  : classes.empty
              }
            >
              {abilities[0][0]}
            </span>
            ,
            <span
              className={
                abilities[0][1] === 10
                  ? classes.full
                  : abilities[0][1] > 3
                  ? classes.half
                  : classes.empty
              }
            >
              {abilities[0][1]}
            </span>
            ,
            <span
              className={
                abilities[0][2] === 3
                  ? classes.full
                  : abilities[0][2] > 1
                  ? classes.half
                  : classes.empty
              }
            >
              {abilities[0][2]}
            </span>
            , ]
          </p>
        </div>
        <div className={classes.characterRemainingAbilities}>
          <img src={ranger_small} alt="ranger icon"  onClick={()=>changeSelectedImage(1)}/>
          <p>
            [{" "}
            <span
              className={
                abilities[1][0] === 20
                  ? classes.full
                  : abilities[1][0] > 5
                  ? classes.half
                  : classes.empty
              }
            >
              {abilities[1][0]}
            </span>
            ,
            <span
              className={
                abilities[1][1] === 5
                  ? classes.full
                  : abilities[1][1] > 2
                  ? classes.half
                  : classes.empty
              }
            >
              {abilities[1][1]}
            </span>
            ,
            <span
              className={
                abilities[1][2] === 10
                  ? classes.full
                  : abilities[1][2] > 3
                  ? classes.half
                  : classes.empty
              }
            >
              {abilities[1][2]}
            </span>
            , ]
          </p>
        </div>
        <div className={classes.characterRemainingAbilities}>
          <img src={mage_small} alt="mage icon"  onClick={()=>changeSelectedImage(2)}/>
          <p>
            [{" "}
            <span
              className={
                abilities[2][0] === 5
                  ? classes.full
                  : abilities[2][0] > 2
                  ? classes.half
                  : classes.empty
              }
            >
              {abilities[2][0]}
            </span>
            ,<span className={
                abilities[2][1] === 10
                  ? classes.full
                  : abilities[2][1] > 3
                  ? classes.half
                  : classes.empty
              }>{abilities[2][1]}</span>,<span className={
                abilities[2][2] === 2
                  ? classes.full
                  : abilities[2][2] > 0
                  ? classes.half
                  : classes.empty
              }>{abilities[2][2]}</span>, ]
          </p>
        </div>
      </div>
    </div>
  );
}
