import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import classes from "./Dungeon.module.css";
import goblin from "../../../../../public/goblin.png";
import ork from "../../../../../public/ork.png";
import elf from "../../../../../public/elf.png";
import dark_elf from "../../../../../public/dark_elf.png";
import chest from "../../../../../public/treasure_chest.png";
import bandit_boss from "../../../../../public/bandit_boss.png";
import dark_elf_boss from "../../../../../public/dark_elf_boss.png";

import cave_full from "../../../../../public/cave_full_pixel.png";
import forest_full from "../../../../../public/forest_full_pixel.png";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../../../../store/profileSlice";
import NextFloorMenu from "./NextFloorMenu";
import EnemyInfo from "./EnemyInfo";
import {
  updateGold,
  updateHealth,
  updateLevel,
} from "../../../../../store/thunkActions";

export default function Dungeon({ setLocation, location }) {
  const dispatch = useDispatch();
  const [enemy, setEnemy] = useState("");
  const [enemyHealth, setEnemyHealth] = useState(15);
  const [enemyMaxHealth, setEnemyMaxHealth] = useState(15);
  const [enemyPower, setEnemyPower] = useState(1);
  const [enemyStunStatus, setEnemyStunStatus] = useState(false);
  const [enemyPoisonedStatus, setEnemyPoisonedStatus] = useState(0);

  const [enemyIsAttacking, setEnemyIsAttacking] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const userClass = useSelector((state) => state.profile.class);
  const userHealth = useSelector((state) => state.profile.health);
  const classAbilities = useSelector((state) => state.profile.abilities);
  const floor =
    location === "cave"
      ? useSelector((state) => state.profile.cave_floor)
      : location === "forest" &&
        useSelector((state) => state.profile.forest_floor);
  const currentClassAblities = classAbilities[userClass];
  const classAbilitiesNames = useSelector(
    (state) => state.profile.abilities_name
  );
  const currentClassAblitiesNames = classAbilitiesNames[userClass];

  const [message, setMessage] = useState("");

  function playerFlee() {
    const rollFlee = Math.floor(Math.random() * 20 + 1);
    if (rollFlee > 10) {
      setLocation("");
    } else {
      notification("Player wasn't able to flee.");
    }
    enemyAttack(false);
  }

  function playerAttack(abilityIndex, abilityNumber) {
    var enemyStunned = false;
    if (abilityNumber <= 0) return;
    dispatch(
      profileActions.CHANGE_ABILITY_NUMBER({
        classIndex: userClass,
        abilityIndex,
      })
    );
    var dmgToEnemy = 0;
    var healToPlayer = 0;
    if (userClass === 2 && (abilityIndex === 1 || abilityIndex === 2)) {
      //healing spell,magic missle no hit check
      if (abilityIndex === 1) {
        dmgToEnemy = Math.floor(Math.random() * 6 + 1);
      } else {
        healToPlayer = Math.floor(Math.random() * 12 + 2);
      }
    } else {
      var rollHit = Math.floor(Math.random() * 20 + 1);
      if (enemy === "chest") rollHit = Math.floor(Math.random() * 5 + 16);
      if (enemyStunStatus) {
        const rollHit2 = Math.floor(Math.random() * 20 + 1);
        if (rollHit2 > rollHit) rollHit = rollHit2;
      }
      if (rollHit > 5) {
        // if 20 than crit 2x dmg
        if (userClass === 0) {
          if (abilityIndex === 0) {
            dmgToEnemy = Math.floor(Math.random() * 12 + 4);
          } else if (abilityIndex === 1) {
            dmgToEnemy = Math.floor(Math.random() * 8 + 4);
            if (rollHit > 9) {
              setEnemyStunStatus(true);
              enemyStunned = true;
            }
          } else if (abilityIndex === 2) {
            dmgToEnemy = Math.floor(Math.random() * 15 + 2);
          }
        } else if (userClass === 1) {
          if (abilityIndex === 0) {
            dmgToEnemy = Math.floor(Math.random() * 12 + 4);
          } else if (abilityIndex === 1) {
            dmgToEnemy = Math.floor(Math.random() * 12 + 2);
            if (rollHit > 9) {
              setEnemyPoisonedStatus(3);
            }
          } else if (abilityIndex === 2) {
            dmgToEnemy = Math.floor(Math.random() * 6 + 1);
          }
        } else {
          //fireball only
          dmgToEnemy = Math.floor(Math.random() * 12 + 4);
        }
        if (rollHit === 20) {
          dmgToEnemy = dmgToEnemy * 2;
        }
      } else {
        notification("Player missed his target.");
      }
    }
    if (healToPlayer > 0) {
      dispatch(updateHealth(-healToPlayer));
      notification("Player healed himself for " + healToPlayer + " HP.");
    }
    if (enemyHealth <= dmgToEnemy) {
      // level up !!!
      getExperience();

      setEnemy("");
      setEnemyStunStatus(false);
      setEnemyPoisonedStatus(0);
      notification("Player killed the monster.");
      return;
    }
    if (enemyPoisonedStatus > 0) {
      setEnemyPoisonedStatus((prev) => prev - 1);
      dmgToEnemy += Math.floor(Math.random() * 6 + 1);
    }
    if (dmgToEnemy > 0) {
      setEnemyHealth((prev) => prev - Math.floor(dmgToEnemy));
      notification("Player hit the monster for " + Math.floor(dmgToEnemy) + " HP.");
    }
    if (enemy !== "chest") enemyAttack(enemyStunned);
  }

  async function getExperience() {
    const geinedXP = Math.floor(Math.random() * 15 + 10);
    dispatch(updateLevel(geinedXP));
    let geinedGold = Math.floor(Math.random() * 8 + 3);
    if (location === "forest") geinedGold *= 2;
    if (enemy === "chest") geinedGold *= 7;
    dispatch(updateGold(geinedGold));
  }

  function enemyAttack(enemyStunned) {
    if (enemyHealth <= 0) {
      // level up !!!
      getExperience();

      setEnemyStunStatus(false);
      setEnemyPoisonedStatus(0);
      setEnemy("");
      notification("Player killed the monster.");
      return;
    }
    setEnemyIsAttacking(true);
    setTimeout(() => {
      if (enemyStunStatus || enemyStunned) {
        setEnemyStunStatus(false);
        notification("The monster was stunned.");
      } else {
        var dmgToPlayer = 0;
        const rollHit = Math.floor(Math.random() * 20 + 1);
        if (rollHit > 10) {
          dmgToPlayer = Math.floor(Math.random() * 8 + 4);
          if (rollHit === 20) {
            dmgToPlayer *= 2;
          }
          if (location === "forest") {
            dmgToPlayer *= 1.5;
          }
          notification("Player took " + Math.floor(dmgToPlayer) + " damage.");
        } else {
          notification("Player dodged the attack.");
        }
        dispatch(updateHealth(Math.floor(dmgToPlayer)));
      }
    }, 1000);
    setTimeout(() => {
      setEnemyIsAttacking(false);
      if (userHealth <= 0) {
        setLocation("playerDead");
      }
    }, 1000);
  }

  function notification(messageValue) {
    setMessage(messageValue);
    setShowNotifications(true);
    setTimeout(() => {
      setShowNotifications(false);
    }, 4000);
  }

  //minimap shows 2 rooms in front of you and if there is a chest or an enemy
  function calculateEnemy() {
    let rollEnemyPower = Math.random() * (0.1 * floor) + 1 + 0.1 * floor;

    var rollEnemyImage = "goblin";
    if (floor % 5 == 0) {
      if (location === "cave") rollEnemyImage = "bandit_boss";
      else rollEnemyImage = "dark_elf_boss";
      rollEnemyPower *= 1.5;
    } else if (floor % 4 == 0) {
      rollEnemyImage = "chest";
      rollEnemyPower = 0;
    } else {
      if (rollEnemyPower > 1.5 && location === "cave") {
        // test
        rollEnemyImage = "ork";
      } else if (location === "forest") {
        rollEnemyImage = "dark_elf";
        if (rollEnemyPower > 1.5) {
          rollEnemyImage = "elf";
        }
      }
    }
    const rollEnemyHealth = Math.floor(15 * rollEnemyPower * 2);

    setEnemy(rollEnemyImage);
    setEnemyHealth(rollEnemyHealth);
    setEnemyMaxHealth(rollEnemyHealth);
    setEnemyPower(rollEnemyPower);
  }
  useEffect(() => {
    calculateEnemy();
  }, [floor]);

  return (
    <motion.div
      className={classes.caveDiv}
      key="dungeon"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
    >
      <img
        src={
          location === "cave" ? cave_full : location === "forest" && forest_full
        }
        alt="location background"
        className={classes.locationBackground}
      />
      <AnimatePresence>
        {enemy && (
          <motion.div
            className={classes.characterDiv}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
          >
            <img
              src={
                enemy === "ork"
                  ? ork
                  : enemy === "goblin"
                  ? goblin
                  : enemy === "dark_elf"
                  ? dark_elf
                  : enemy === "elf"
                  ? elf
                  : enemy === "chest"
                  ? chest
                  : enemy === "bandit_boss"
                  ? bandit_boss
                  : dark_elf_boss
              }
              alt="enemy"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            className={classes.notificationMessage}
            key={message + Math.random()}
            initial={{ opacity: 0, transition: { delay: 0.5 } }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 75, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={classes.dialogMenu}>
        <AnimatePresence>
          {enemyIsAttacking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className={classes.enemyIsAttackingBlockMenu}
            >
              Enemy is attacking...
            </motion.div>
          )}
        </AnimatePresence>
        {enemy && (
          <>
            <div className={classes.userOptions}>
              <h2>How do you attack?</h2>
              {currentClassAblities.map((item, index) => (
                <motion.p
                  className={classes.pointerHover}
                  animate={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  onClick={() => playerAttack(index, item)}
                  key={index}
                >
                  &gt; {currentClassAblitiesNames[index]} - {item}
                </motion.p>
              ))}
              <motion.p
                className={classes.pointerHover}
                animate={{ x: 0 }}
                whileHover={{ x: 5 }}
                onClick={() => playerFlee()}
              >
                &gt; Flee
              </motion.p>
            </div>
            <EnemyInfo
              health={enemyHealth}
              maxHealth={enemyMaxHealth}
              power={enemyPower}
              stun={enemyStunStatus}
              poison={enemyPoisonedStatus}
            />
          </>
        )}
        {!enemy && (
          <NextFloorMenu location={location} setLocation={setLocation} />
        )}
      </div>
    </motion.div>
  );
}
