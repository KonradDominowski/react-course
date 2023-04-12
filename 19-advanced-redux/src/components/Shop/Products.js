import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { useSelector } from 'react-redux'

const Products = () => {
  const items = useSelector(store => store.items)

  const productsList = items.map(item => <ProductItem key={ item.key } item={ item } />)

  return (
    <section className={ classes.products }>
      <h2>Buy your favorite products</h2>
      <ul>
        { productsList }
      </ul>
    </section>
  );
};

export default Products;
