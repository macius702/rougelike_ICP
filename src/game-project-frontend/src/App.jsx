import { useState } from "react";
import RegisterPanel from "./components/registerForm/RegisterPanel";
import LoginPanel from "./components/loginForm/LoginPanel";
import { Provider } from "react-redux";
import store from "../store/indexRedux";
import GameDisplay from "./components/loggedIn/GameDisplay";
import { AnimatePresence } from "framer-motion";

function App() {
  const [logStatus, setLogStatus] = useState("register"); // register, login, loggedIn

  return (
    <main>
      {logStatus === "register" && (
        <RegisterPanel setLogStatus={setLogStatus} />
      )}
      <Provider store={store} key="home">
        <AnimatePresence>
          {logStatus === "login" && <LoginPanel setLogStatus={setLogStatus} />}
        </AnimatePresence>
        {logStatus === "loggedIn" && <GameDisplay />}
      </Provider>
    </main>
  );
}

export default App;
