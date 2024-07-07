import React from "react";
import { useSelector } from "react-redux";

function Test() {
  const userName = useSelector((state) => state.profile.name);
  const userGold = useSelector((state) => state.profile.gold);
  const userPower = useSelector((state) => state.profile.power);
  console.log("test");
  console.log(userGold);
  return <div>Test</div>;
}

export default Test;
