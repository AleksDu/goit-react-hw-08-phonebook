import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authOperations, authSelectors } from "../../redux/auth";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LoaderComponent from "../../components/LoaderComponent";
import s from "./RegisterPage.module.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.getLoading);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        return setName(value);

      case "email":
        return setEmail(value);

      case "password":
        return setPassword(value);

      default:
        return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return toast.error("please put symbols in all fields!");
    } else if (password.length < 7) {
      return toast.info("Password must be longer then 7 symbols!");
    }
    dispatch(authOperations.register({ name, email, password }));
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
      <TextField
        label="Name"
        variant="outlined"
        color="secondary"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        className={s.textField}
      />
      <TextField
        label="Email"
        variant="outlined"
        color="secondary"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        className={s.textField}
      />

      <TextField
        label="Password"
        variant="outlined"
        color="secondary"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        className={s.textField}
      />
      {!isLoading && (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
        >
          Sign up
        </Button>
      )}
      {isLoading && <LoaderComponent />}
    </form>
  );
}
