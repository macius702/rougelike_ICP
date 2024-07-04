import classes from "./FormInput.module.css";
import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const FormInput = forwardRef(
  ({ label, id, onChange, type = "text", errorMessage, onClick }, ref) => {
    return (
      <div className={errorMessage ? classes.errorInput : classes.formInputDiv}>
        <motion.input
          type={type}
          id={id}
          placeholder={label}
          ref={ref}
          onChange={onChange}
          whileTap={{ scale: 1.06 }}
          onClick={onClick}
        />
        <span className={classes.errorMessage}>{errorMessage}</span>
      </div>
    );
  }
);

export default FormInput;
