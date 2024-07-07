import classes from "./Button.module.css";
import { motion } from "framer-motion";

export default function Button({ isEmpty, children, onClick, loading = undefined }) {
  return (
    <motion.button
      className={isEmpty ? classes.customButtonIsEmpty : classes.customButton}
      onClick={onClick}
      whileHover={{scale: 1.1, backgroundColor: isEmpty ? "#ffffff" : "#781acf", border: isEmpty ? "1px solid #781acf" : 0, color: isEmpty ? "#781acf" : "#ffffff"}}
      whileTap={{scale: 1.06}}
      animate={{backgroundColor: isEmpty ? "#ffffff" : "#1a6ecf", border: isEmpty ? "1px solid #1a6ecf" : 0, color: isEmpty ? "#1a6ecf" : "#ffffff"}}
      disabled={loading ? true : undefined}
    >
      {loading ? "loading" : children}
    </motion.button>
  );
}
