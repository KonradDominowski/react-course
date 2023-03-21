import { React, useRef, useState } from "react";
import styles from "./UserForm.module.css";
import "./Button";
import Button from "./Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

export default function UserForm(props) {
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  // const handleUsernameChange = (e) => {
  //   setEnteredUsername(e.target.value);
  // };

  // const handleAgeChange = (e) => {
  //   setEnteredAge(e.target.value);
  // };

  const [error, setError] = useState(null);
  const enteredAgeRef = useRef();
  const enteredUsernameRef = useRef();

  const handleSubmitClick = () => {
    let enteredUsername = enteredUsernameRef.current.value;
    let enteredAge = enteredAgeRef.current.value;

    if (!enteredUsername.trim() || !enteredAge) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
    } else if (Number(enteredAge) <= 0) {
      setError({
        title: "Invalid age",
        message: "Please enter age larger than 0",
      });
    } else {
      let newUser = {
        key: Math.random() * Math.random(),
        username: enteredUsername,
        age: enteredAge,
      };
      props.onAddUser(newUser);

      // Raczej się nie modyfikuje DOMu przez Ref, ale pan na kursie powiedział że tutaj jest ok.
      enteredUsernameRef.current.value = "";
      enteredAgeRef.current.value = "";
    }
  };

  const handleCloseModal = (e) => {
    setError(null);
  };

  return (
    <Card className={styles.input}>
      {error && <Modal onCloseModal={handleCloseModal} error={error} />}
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        ref={enteredUsernameRef}
        // value={enteredUsername}
        // onChange={handleUsernameChange}
      />

      <label htmlFor="age">Age (Years)</label>
      <input
        id="age"
        type="number"
        ref={enteredAgeRef}
        // value={enteredAge}
        // onChange={handleAgeChange}
      />

      <Button handleClick={handleSubmitClick}>Add User</Button>
    </Card>
  );
}
