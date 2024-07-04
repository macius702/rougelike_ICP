import { useState } from "react";
import RegisterPanel from "./components/registerForm/RegisterPanel";
import LoginPanel from "./components/loginForm/LoginPanel";
import { Provider } from "react-redux";
import store from "../store/indexRedux";
import Test from "./components/LoggedIn/Test";

function App() {
  const [logStatus, setLogStatus] = useState("register"); // register, login, loggedIn
  const [Logged, setLogged] = useState({});

  console.log(Logged);

  return (
    <main>
      {logStatus === "register" && (
        <RegisterPanel setLogStatus={setLogStatus} />
      )}
      <Provider store={store} key="home">
        {logStatus === "login" && (
          <LoginPanel setLogStatus={setLogStatus} setLogged={setLogged} />
        )}
        {logStatus === "loggedIn" && <Test />}
      </Provider>
    </main>
  );
}

export default App;
