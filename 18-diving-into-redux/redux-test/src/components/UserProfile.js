import classes from './UserProfile.module.css';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector(state => state.auth.user)

  return (
    <main className={ classes.profile }>
      <h2>My User Profile</h2>
      <p>{ user }</p>
    </main>
  );
};

export default UserProfile;
