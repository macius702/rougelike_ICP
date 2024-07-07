import classes from "./GameScreen.module.css";
import woodBackground from "../../../../public/wood.png";
import map from "../../../../public/map.png";
import forest from "../../../../public/forest_pixel.png";
import cave from "../../../../public/cave_pixel.png";
import inn from "../../../../public/inn_pixel.png";
import forest_selected from "../../../../public/forest_pixel_selected.png";
import cave_selected from "../../../../public/cave_pixel_selected.png";
import inn_selected from "../../../../public/inn_pixel_selected.png";
import { useState } from "react";
import Dungeon from "./dungeon/Dungeon";
import Inn from "./inn/Inn";

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
              onClick={() => setLocation("cave")}
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
      {location === "inn" && <Inn setLocation={setLocation}/>}
      {location === "cave" && (
        <Dungeon setLocation={setLocation} location={location} />
      )}
    </div>
  );
}
