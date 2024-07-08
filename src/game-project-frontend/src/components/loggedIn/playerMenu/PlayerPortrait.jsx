import classes from "./PlayerPortrait.module.css";
import knight from "../../../../public/knight.png";
import ranger from "../../../../public/ranger.png";
import mage from "../../../../public/mage.png";
import { motion } from "framer-motion";
import { game_project_backend } from "declarations/game-project-backend";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { profileActions } from "../../../../store/profileSlice";

export default function PlayerPortrait({selectedPortrait,setSelectedPortrait}) {
  const dispatch = useDispatch();
  const image_array = [knight, ranger, mage];
  const image_array_names = ["Knight", "Ranger", "Mage"];

  const userIndex = useSelector((state) => state.profile.index);

  var databaseSelectedImage = 0;
  useEffect(() => {
    async function fetchSelectedImage() {
      databaseSelectedImage =
        await game_project_backend.get_user_portrait_at_index(userIndex);
      setSelectedPortrait(databaseSelectedImage);
      dispatch(profileActions.CHANGE_CLASS(databaseSelectedImage));
    }
    fetchSelectedImage();
  }, []);
  useEffect(() => {
    async function changeSelectedImage() {
      await game_project_backend.update_user_portrait(
        userIndex,
        selectedPortrait
      );
    }
    if (selectedPortrait !== databaseSelectedImage) {
      changeSelectedImage();
    }
  }, [selectedPortrait]);

  function changeSelectedImageFromSvg(value) {
    if (value === 1 && selectedPortrait === 2) {
      setSelectedPortrait(0);
      dispatch(profileActions.CHANGE_CLASS(0));
    } else if (value === -1 && selectedPortrait === 0) {
      setSelectedPortrait(2);
      dispatch(profileActions.CHANGE_CLASS(2));
    } else {
      dispatch(profileActions.CHANGE_CLASS(selectedPortrait + value));
      setSelectedPortrait((prev) => prev + value);
    }
  }

  const hover = {
    out: { opacity: 0 },
    over: { opacity: 1 },
  };

  return (
    <div className={classes.playerStatsDiv}>
      <motion.div
        className={classes.playerImageDiv}
        initial="out"
        animate="out"
        whileHover="over"
      >
        <motion.svg
          onClick={() => changeSelectedImageFromSvg(1)}
          variants={hover}
          fill="#000000"
          height="200px"
          width="200px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-2.4 -2.4 28.80 28.80"
          xmlSpace="preserve"
          stroke="#000000"
          strokeWidth="2.4"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <polygon points="12,17 11,17 11,15 9,15 9,13 21,13 21,11 9,11 9,9 11,9 11,7 12,7 12,5 9,5 9,7 7,7 7,9 5,9 5,10 4,10 4,11 3,11 3,13 4,13 4,14 5,14 5,15 7,15 7,17 9,17 9,19 12,19 "></polygon>{" "}
          </g>
        </motion.svg>
        <div className={classes.imageDiv}>
          <img src={image_array[selectedPortrait]} />
          <p>{image_array_names[selectedPortrait]}</p>
        </div>
        <motion.svg
          onClick={() => changeSelectedImageFromSvg(-1)}
          variants={hover}
          fill="#000000"
          height="200px"
          width="200px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-2.4 -2.4 28.80 28.80"
          xmlSpace="preserve"
          stroke="#000000"
          strokeWidth="2.4"
          transform="rotate(180)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <polygon points="12,17 11,17 11,15 9,15 9,13 21,13 21,11 9,11 9,9 11,9 11,7 12,7 12,5 9,5 9,7 7,7 7,9 5,9 5,10 4,10 4,11 3,11 3,13 4,13 4,14 5,14 5,15 7,15 7,17 9,17 9,19 12,19 "></polygon>{" "}
          </g>
        </motion.svg>
      </motion.div>
    </div>
  );
}
