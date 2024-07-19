import { useDispatch } from "react-redux";
import classes from "./Inn.module.css";
import { profileActions } from "../../../../../store/profileSlice";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import innkeeper from "../../../../../public/innkeeper.png";
import inn_full from "../../../../../public/inn_full_pixel.png";
import { updateGold, updateHealth } from "../../../../../store/thunkActions";
import { useSelector } from "react-redux";

export default function Inn({ setLocation }) {
  const dispatch = useDispatch();
  const userGold = useSelector((state) => state.profile.gold);

  const [message, setMessage] = useState("");

  function notification(messageValue) {
    setMessage(messageValue);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  function restFunction() {
    if(userGold>=25){
      dispatch(updateGold(-25));
      dispatch(updateHealth(-100));
      dispatch(profileActions.REFILL_ABILITY_NUMBER());
      notification("Player took a long rest.");
    }
    else notification("Player does not have enough gold.");
  }

  function healFunction(healAmount, goldAmount) {
    if(userGold>=goldAmount){
      dispatch(updateGold(-goldAmount));
      dispatch(updateHealth(-healAmount));
      notification("Player regained " + healAmount + " HP.");
    }
    else notification("Player does not have enough gold.");
  }
  return (
    <motion.div
      className={classes.innDiv}
      key="inn"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
    >
      <AnimatePresence>
        {message && (
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
      <img src={inn_full} alt="Inn" className={classes.locationBackground} />
      <motion.div
        className={classes.characterDiv}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay:0.2,
          duration: 0.5
        }}
      >
        <img src={innkeeper} alt="innkeeper" />
      </motion.div>
      <div className={classes.dialogMenu}>
        <h2>What can I get for you?</h2>
        <motion.p
          className={classes.pointerHover}
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
          onClick={() => healFunction(15, 5)}
        >
          &gt; Elvish wine, please. (+15hp) - 5gp
        </motion.p>
        <motion.p
          className={classes.pointerHover}
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
          onClick={() => healFunction(30, 8)}
        >
          &gt; Orkish mead, please. (+30hp) - 8gp
        </motion.p>
        <motion.p
          className={classes.pointerHover}
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
          onClick={() => restFunction()}
        >
          &gt; Rest (+100hp, replenish abilities) - 25gp
        </motion.p>
        <motion.p
          className={classes.pointerHover}
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
          onClick={() => setLocation("")}
        >
          &gt; Exit
        </motion.p>
      </div>
    </motion.div>
  );
}
