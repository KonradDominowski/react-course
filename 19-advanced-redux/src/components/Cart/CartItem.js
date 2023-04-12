import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store';

const CartItem = (props) => {
  const { title, quantity, totalPrice, price } = props.item;
  const dispatch = useDispatch()

  const onAddItem = () => {
    dispatch(cartActions.addItem({ item: props.item }))
  }

  const onRemoveItem = () => {
    dispatch(cartActions.removeItem({ item: props.item }))
  }

  return (
    <li className={ classes.item }>
      <header>
        <h3>{ title }</h3>
        <div className={ classes.price }>
          ${ totalPrice.toFixed(2) }{ ' ' }
          <span className={ classes.itemprice }>(${ price.toFixed(2) }/item)</span>
        </div>
      </header>
      <div className={ classes.details }>
        <div className={ classes.quantity }>
          x <span>{ quantity }</span>
        </div>
        <div className={ classes.actions }>
          <button onClick={ onRemoveItem }>-</button>
          <button onClick={ onAddItem }>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
