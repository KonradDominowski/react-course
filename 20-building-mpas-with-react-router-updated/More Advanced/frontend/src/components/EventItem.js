import { Link, json } from 'react-router-dom';
import classes from './EventItem.module.css';

export const loader = async (obj) => {
  const id = obj.params.eventID
  const res = await fetch('http://localhost:8080/events/' + id)

  if (!res.ok) {
    throw json({ message: `Could not fetch the item, maybe it doesn't exist?` }, { status: 500 })
  }
  return res
}

function EventItem({ event }) {

  function startDeleteHandler() {
    // ...
  }

  return (
    <article className={ classes.event }>
      <img src={ event.image } alt={ event.title } />
      <h1>{ event.title }</h1>
      <time>{ event.date }</time>
      <p>{ event.description }</p>
      <menu className={ classes.actions }>
        <Link to='edit'>Edit</Link>
        <button onClick={ startDeleteHandler }>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
