import classes from "./RegisterPanel.module.css";
import FormInput from "../FormInput";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import { game_project_backend } from "declarations/game-project-backend";
import { encryptString } from "../../../tools/enryption";

function RegisterPanel({ setLogStatus }) {
  const loginRef = useRef(null);
  const [loginWasSubmitted, setLoginWasSubmitted] = useState(false);
  const [loginErrorOption, setLoginErrorOption] = useState("");

  const passwordRef = useRef(null);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordErrorOption, setPasswordErrorOption] = useState("");

  const confirmPasswordRef = useRef(null);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
  const [confirmPasswordErrorOption, setConfirmPasswordErrorOption] =
    useState("");

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
      setPasswordIsValid(false);
    } else if (!/(?=.*[a-z])/.test(passwordRef.current.value)) {
      setPasswordErrorOption("Must contain at least one lowercase letter.");
      setPasswordIsValid(false);
    } else if (!/(?=.*[A-Z])/.test(passwordRef.current.value)) {
      setPasswordErrorOption("Must contain at least one uppercase letter.");
      setPasswordIsValid(false);
    } else if (!/(?=.*\d)/.test(passwordRef.current.value)) {
      setPasswordErrorOption("Must contain at least one digit.");
      setPasswordIsValid(false);
    } else if (!/(?=.*[@$!%*?&])/.test(passwordRef.current.value)) {
      setPasswordErrorOption("Must contain at least one special character.");
      setPasswordIsValid(false);
    } else if (!/.{8,}/.test(passwordRef.current.value)) {
      setPasswordErrorOption("Must be at least 8 characters long.");
      setPasswordIsValid(false);
    } else {
      setPasswordErrorOption("");
      setPasswordIsValid(true);
    }
  }

  function checkConfirmPassword() {
    if (confirmPasswordRef.current.value == "") {
      setConfirmPasswordErrorOption("Input required.");
      setConfirmPasswordIsValid(false);
    } else if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      setConfirmPasswordErrorOption("Passwords must be the same.");
      setConfirmPasswordIsValid(false);
    } else {
      setConfirmPasswordErrorOption("");
      setConfirmPasswordIsValid(true);
    }
  }
  useEffect(() => {
    if (formWasSubmittedAndIsValid) {
      async function checkLoginIsAvailable() {
        try {
          const isAvailable = await game_project_backend.find_login_index(
            loginRef.current.value
          );
          if (isAvailable === -1) {
            setLoading(true);
            await game_project_backend.add_user(
              loginRef.current.value,
              encryptString(passwordRef.current.value, "bals"),
              15,
              1
            );
            setLoading(false);
            setLogStatus("login");
          } else {
            setLoginErrorOption("This Login is already taken.");
          }
        } catch (error) {
          console.error("Error fetching logins:", error);
        }
      }
      checkLoginIsAvailable();
    }
  }, [formWasSubmittedAndIsValid]);

  function handleSubmit() {
    if (loginWasSubmitted && passwordIsValid && confirmPasswordIsValid) {
      setFromWasSubmittedAndIsValid(true);
    } else {
      checkLogin();
      checkPassword();
      checkConfirmPassword();
    }
  }

  return (
    <div className={classes.registerPanelDiv}>
      <div className={classes.registerForm}>
        <h1>Signup</h1>
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
            id="password-1"
            type="password"
            ref={passwordRef}
            onChange={checkPassword}
            errorMessage={passwordErrorOption}
            onClick={() => setPasswordErrorOption("")}
          />
          <FormInput
            label="Confirm password"
            id="password-2"
            type="password"
            ref={confirmPasswordRef}
            onChange={checkConfirmPassword}
            errorMessage={confirmPasswordErrorOption}
            onClick={() => setConfirmPasswordErrorOption("")}
          />
        </div>
        <div className={classes.buttonsDiv}>
          <Button onClick={handleSubmit} loading={loading}>
            Submit
          </Button>
          <Button isEmpty onClick={() => setLogStatus("login")}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPanel;
