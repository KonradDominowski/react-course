import { React, useState } from 'react';
import UserForm from './UserForm/UserForm'
import UserList from './UserList/UserList';



function App() {
  const [userState, setUserState] = useState([
    { key: 0.39742948206383316, username: '123', age: '2134' },
    { key: 0.04130160088208556, username: '123', age: '2134' },
    { key: 0.06990283636178969, username: '123', age: '2134' }
  ])

  const handleAddUser = (newUser) => {
    setUserState((prevState) => [newUser, ...prevState]);
  }

  return (
    <div>
      <UserForm onAddUser={ handleAddUser } />
      <UserList userList={ userState } />
    </div>
  );
}

export default App;
