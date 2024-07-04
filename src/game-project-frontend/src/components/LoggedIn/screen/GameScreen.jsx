import classes from "./GameScreen.module.css";
import woodBackground from "../../../../public/wood.png";
import map from "../../../../public/map.png";
import forest from "../../../../public/forest_pixel.png";
import cave from "../../../../public/cave_pixel.png";
import inn from "../../../../public/inn_pixel.png";
import forest_selected from "../../../../public/forest_pixel_selected.png";
import cave_selected from "../../../../public/cave_pixel_selected.png";
import inn_selected from "../../../../public/inn_pixel_selected.png";

import inn_full from "../../../../public/inn_full_pixel.png";
import { useState } from "react";

export default function GameScreen({ location, setLocation }) {
  const [forestHover, setForestHover] = useState(false);
  const [caveHover, setCaveHover] = useState(false);
  const [innHover, setInnHover] = useState(false);

  return (
    <div className={classes.gameScreenDiv}>
      {location === "" && (
        <div
          className={classes.tableBackground}
          style={{ backgroundImage: "url(" + woodBackground + ")" }}
        >
          <div className={classes.worldMapDiv}>
            <img src={map} alt="World map" className={classes.worldMapImg} />
            <img
              src={forestHover ? forest_selected : forest}
              alt="Location: Forest"
              className={classes.locationForest}
              onPointerOver={() => setForestHover(true)}
              onPointerOut={() => setForestHover(false)}
            />
            <img
              src={caveHover ? cave_selected : cave}
              alt="Location: Cave"
              className={classes.locationCave}
              onPointerOver={() => setCaveHover(true)}
              onPointerOut={() => setCaveHover(false)}
            />
            <img
              src={innHover ? inn_selected : inn}
              alt="Location: Inn"
              className={classes.locationInn}
              onPointerOver={() => setInnHover(true)}
              onPointerOut={() => setInnHover(false)}
              onClick={() => setLocation("inn")}
            />
          </div>
        </div>
      )}
      {location === "inn" && (
        <div className={classes.innDiv}>
          <img
            src={inn_full}
            alt="Inn"
            className={classes.locationBackground}
          />
          <div className={classes.locationMenu}>
            <div className={classes.backArrow}>
              <svg
                fill="#ffffff"
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
                id="memory-arrow-down-right"
                transform="rotate(180)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M19 12V14H18V15H17V16H16V17H15V18H13V16H14V15H15V14H11V13H9V12H8V10H7V3H9V9H10V11H12V12H15V11H14V10H13V8H15V9H16V10H17V11H18V12"></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
