import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";
import { variants } from "../../utils/motionVar";
import s from "./HomePage.module.css";

const HomePage = () => {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  return (
    <div className={s.wrapper}>
      <AnimatePresence>
        <motion.h1
          className={s.title}
          initial="initial"
          animate="animate"
          exit="exit"
          transition="transition"
          variants={variants}
        >
          Welcome 🙋‍♂️
        </motion.h1>
      </AnimatePresence>
      <AnimatePresence>
        <motion.p
          className={s.text}
          initial="initial"
          animate="animate"
          exit="exit"
          transition="transition"
          variants={variants}
        >
          Now you will never forget your contacts!
        </motion.p>
      </AnimatePresence>
      {!isLoggedIn && (
        <AnimatePresence>
          <motion.p
            className={s.info}
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
            variants={variants}
          >
            Please, <b>Sign up</b> or <b>Log in</b> to have enter to you
            Phonebook!
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
};
export default HomePage;
