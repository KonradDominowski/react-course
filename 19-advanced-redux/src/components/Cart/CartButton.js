import classes from './CartButton.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { UIActions } from '../../store';

const CartButton = (props) => {
  const cart = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const cartSum = cart.map(item => item.quantity).reduce((a, b) => a + b, 0)

  const toggleCartvisible = () => {
    dispatch(UIActions.toggleCartVisibility())
  }

  return (
    <button onClick={ toggleCartvisible } className={ classes.button }>
      <span>My Cart</span>
      <span className={ classes.badge }>{ cartSum }</span>
    </button>
  );
};

export default CartButton;
