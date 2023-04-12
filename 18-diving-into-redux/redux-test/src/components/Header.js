import classes from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';


const Header = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenthicated)
  const dispatch = useDispatch()

  const onlogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <header className={ classes.header }>
      <h1>Redux Auth</h1>
      <nav>
        { isAuthenticated &&
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>

            <li>
              <button onClick={ onlogout }>Logout</button>
            </li>
          </ul>
        }

      </nav>
    </header>
  );
};

export default Header;