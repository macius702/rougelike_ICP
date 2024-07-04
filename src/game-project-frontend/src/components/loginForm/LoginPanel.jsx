import classes from "./LoginPanel.module.css";
import { useRef, useState, useEffect } from "react";
import FormInput from "../FormInput";
import Button from "../Button";
import { game_project_backend } from "declarations/game-project-backend";
import { decryptString } from "../../../tools/enryption";
import { useDispatch } from "react-redux";
import { profileActions } from "../../../store/profileSlice";

export default function LoginPanel({ setLogStatus, setLogged }) {
  const dispatch = useDispatch();

  const loginRef = useRef(null);
  const [loginWasSubmitted, setLoginWasSubmitted] = useState(false);
  const [loginErrorOption, setLoginErrorOption] = useState("");

  const passwordRef = useRef(null);
  const [passwordWasSubmitted, setPasswordWasSubmitted] = useState(false);
  const [passwordErrorOption, setPasswordErrorOption] = useState("");

  const [formWasSubmittedAndIsValid, setFromWasSubmittedAndIsValid] =
    useState(false);

  const [loading, setLoading] = useState(false);

  function checkLogin() {
    if (loginRef.current.value == "") {
      setLoginErrorOption("Input required.");
      setLoginWasSubmitted(false);
    } else {
      setLoginErrorOption("");
      setLoginWasSubmitted(true);
    }
  }
  function checkPassword() {
    if (passwordRef.current.value == "") {
      setPasswordErrorOption("Input required.");
      setPasswordWasSubmitted(false);
    } else {
      setPasswordErrorOption("");
      setPasswordWasSubmitted(true);
    }
  }

  useEffect(() => {
    setFromWasSubmittedAndIsValid(false);
    if (formWasSubmittedAndIsValid) {
      async function login() {
        try {
          const loginIndex = await game_project_backend.find_login_index(
            loginRef.current.value
          );
          console.log(loginIndex);
          if (loginIndex >= 0) {
            setLoading(true);
            var loginPassword =
              await game_project_backend.get_password_at_index(loginIndex);
            loginPassword = decryptString(loginPassword, "bals");

            if (loginPassword === passwordRef.current.value) {
              // logged in

              const gold = await game_project_backend.get_gold_at_index(
                loginIndex
              );
              const power = await game_project_backend.get_power_at_index(
                loginIndex
              );

              setLogged({
                name: loginRef.current.value,
                gold,
                power,
              });

              //
              dispatch(
                profileActions.LOGIN({
                  name: loginRef.current.value,
                  gold,
                  power,
                })
              );
            } else {
              setPasswordErrorOption("Password is incorrect.");
            }
            setLoading(false);
            setLogStatus("loggedIn");
          } else {
            setLoginErrorOption("This Login doesn't exist.");
          }
        } catch (error) {
          console.error("Error fetching logins:", error);
        }
      }
      login();
    }
  }, [formWasSubmittedAndIsValid, loginRef, passwordRef]);

  function handleSubmit() {
    if (loginWasSubmitted && passwordWasSubmitted) {
      setFromWasSubmittedAndIsValid(true);
    }
  }

  return (
    <div className={classes.loginPanelDiv}>
      <div className={classes.loginForm}>
        <h1>Login</h1>
        <div className={classes.form}>
          <FormInput
            label="Name"
            id="name"
            ref={loginRef}
            onChange={checkLogin}
            errorMessage={loginErrorOption}
            onClick={() => setLoginErrorOption("")}
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            ref={passwordRef}
            onChange={checkPassword}
            errorMessage={passwordErrorOption}
            onClick={() => setPasswordErrorOption("")}
          />
        </div>
        <div className={classes.buttonsDiv}>
          <Button onClick={handleSubmit} loading={loading}>
            Submit
          </Button>
          <Button isEmpty onClick={() => setLogStatus("register")}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
