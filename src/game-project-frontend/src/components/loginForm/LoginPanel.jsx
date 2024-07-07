import classes from "./LoginPanel.module.css";
import { useRef, useState, useEffect } from "react";
import FormInput from "../FormInput";
import Button from "../Button";
import { game_project_backend } from "declarations/game-project-backend";
import { decryptString } from "../../../tools/enryption";
import { useDispatch } from "react-redux";
import { profileActions } from "../../../store/profileSlice";
import { motion } from "framer-motion";
import { updateHealth } from "../../../store/thunkActions";

export default function LoginPanel({ setLogStatus }) {
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
              const cave_floor =
                await game_project_backend.get_user_cave_floor_at_index(
                  loginIndex
                );
              const forest_floor =
                await game_project_backend.get_user_forest_floor_at_index(
                  loginIndex
                );
              const level =
                await game_project_backend.get_user_experience_at_index(
                  loginIndex
                );
                const health =
                await game_project_backend.get_user_health_at_index(
                  loginIndex
                );

              dispatch(
                profileActions.LOGIN({
                  index: loginIndex,
                  name: loginRef.current.value,
                  gold,
                  power,
                  cave_floor,
                  forest_floor,
                  level,
                  health,
                })
              );
              if (power > 1)
                dispatch(profileActions.CHANGE_MAX_HEALTH(33 + power));

              setLogStatus("loggedIn");
            } else {
              setPasswordErrorOption("Password is incorrect.");
            }
            setLoading(false);
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
    <motion.div
      className={classes.loginPanelDiv}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
}
