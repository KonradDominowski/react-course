import { React, useState } from "react";
import styles from "./UserForm.module.css";
import "./Button";
import Button from "./Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

export default function UserForm(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [inputValid, setInputValid] = useState(true);
  const [message, setMessage] = useState("");

  const handleUsernameChange = (e) => {
    setEnteredUsername(e.target.value);
  };

  const handleAgeChange = (e) => {
    setEnteredAge(e.target.value);
  };

  const handleSubmitClick = () => {
    if (!enteredUsername.trim() || !enteredAge) {
      setMessage("Please enter a valid name and age (non-empty values).");
      setInputValid(false);
    } else if (Number(enteredAge) <= 0) {
      setMessage("Please enter age larger than 0.");
      setInputValid(false);
    } else {
      let newUser = {
        key: Math.random() * Math.random(),
        username: enteredUsername,
        age: enteredAge,
      };
      props.onAddUser(newUser);
      setEnteredUsername("");
      setEnteredAge("");
    }
  };

  const handleCloseModal = (e) => {
    setInputValid(true);
  };

  return (
    <Card className={styles.input}>
      {!inputValid && (
        <Modal onCloseModal={handleCloseModal} message={message} />
      )}
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={enteredUsername}
        onChange={handleUsernameChange}
      />

      <label htmlFor="age">Age (Years)</label>
      <input
        id="age"
        type="number"
        value={enteredAge}
        onChange={handleAgeChange}
      />

      <Button handleClick={handleSubmitClick}>Add User</Button>
    </Card>
  );
}
