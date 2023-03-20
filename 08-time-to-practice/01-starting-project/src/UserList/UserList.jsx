import React from "react";
import Card from "../UI/Card";
import styles from "./UserList.module.css";

export default function UserList(props) {
  console.log(props.userList);

  const users = props.userList.map((user) => (
    <li key={user.key}>
      {user.username} ({user.age} years old)
    </li>
  ));

  return (
    <Card className={styles.users}>
      <ul>{users}</ul>
    </Card>
  );
}
