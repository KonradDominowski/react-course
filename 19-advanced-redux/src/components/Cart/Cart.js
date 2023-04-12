import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../../store';

const Cart = () => {
  const cart = useSelector(state => state.cart.items)
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible)
  const cartHasItems = Object.keys(cart).length > 0
  const dispatch = useDispatch()

  const cartItemsList = cart.map((item, key) => <CartItem
    key={ key }
    item={ item } />)
  return (
    <>
      { cartIsVisible && <Card className={ classes.cart }>
        <h2>Your Shopping Cart { !cartHasItems && 'is empty' } </h2>
        <ul>
          { cartItemsList }
        </ul>
        <button onClick={ () => { dispatch(cartActions.clearCart()) } }>Clear cart</button>
      </Card> }
    </>
  );
}


export default Cart;
