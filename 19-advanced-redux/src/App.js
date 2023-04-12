import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { sendCartData, fetchCartData } from './store';
import Notification from './components/UI/Notification';

function App() {
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (cart.changed === true) {
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch])

  return (
    <>
      { notification && <Notification notification={ notification } /> }
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </>
  );
}

export default App;
