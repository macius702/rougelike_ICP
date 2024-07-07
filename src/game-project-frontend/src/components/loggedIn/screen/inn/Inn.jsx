import { useDispatch } from "react-redux";
import classes from "./Inn.module.css";
import { profileActions } from "../../../../../store/profileSlice";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import innkeeper from "../../../../../public/innkeeper.png";
import inn_full from "../../../../../public/inn_full_pixel.png";

export default function Inn({ setLocation }) {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  function notification(messageValue) {
    setMessage(messageValue);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  function restFunction(){
    dispatch(profileActions.CHANGE_GOLD(-10));
    dispatch(profileActions.TAKE_DAMAGE(-100));
    dispatch(profileActions.REFILL_ABILITY_NUMBER());
    notification("Player took a long rest.");
  }

  function healFunction(healAmount, goldAmount) {
    dispatch(profileActions.CHANGE_GOLD(-goldAmount));
    dispatch(profileActions.TAKE_DAMAGE(-healAmount));
    notification("Player regained " + healAmount + " HP.");
  }
  return (
    <div className={classes.innDiv}>
      <AnimatePresence>
        {message && (
          <motion.div
            className={classes.notificationMessage}
            key={message}
            initial={{ opacity: 0, transition: { delay: 0.5 } }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 75, opacity: 0 }}
            transition={{ duration: 0.5 }}
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
      >
        <img src={innkeeper} alt="innkeeper" />
      </motion.div>
      <div className={classes.dialogMenu}>
        <h2>What can I get for you?</h2>
        <motion.p
          className={classes.pointerHover}
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
          onClick={()=>healFunction(50,3)}
        >
          &gt; Elvish wine, please. (+50hp) - 3gp
        </motion.p>
        <motion.p
          className={classes.pointerHover}
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
          onClick={()=>healFunction(80,5)}
        >
          &gt; Orkish mead, please. (+80hp) - 5gp
        </motion.p>
        <motion.p
          className={classes.pointerHover}
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
          onClick={()=>restFunction()}
        >
          &gt; Rest (+100hp, replenish abilities) - 10gp
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
    </div>
  );
}
