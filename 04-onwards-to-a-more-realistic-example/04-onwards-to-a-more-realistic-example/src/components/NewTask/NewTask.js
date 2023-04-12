import { useEffect, useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

import useHTTP from '../../hooks/use-http';

const NewTask = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const enterTaskHandler = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch(
  //       'https://react-course-51208-default-rtdb.firebaseio.com/tasks.json',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({ text: taskText }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const generatedId = data.name; // firebase-specific => "name" contains generated id
  //     const createdTask = { id: generatedId, text: taskText };

  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  const createTask = (taskText, data) => {
    console.log(data)
    console.log(taskText)
    const generatedId = data.name; // firebase-specific => "name" contains generated id

    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask)
  }

  const enterTaskHandler = (taskText) => {
    sendRequest({
      url: props.url,
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      }
    }, createTask.bind(null, taskText))
  }


  const { isLoading, error, sendRequest } = useHTTP()

  return (
    <Section>
      <TaskForm
        onEnterTask={ enterTaskHandler }
        loading={ isLoading }
      />
      { error && <p>{ error.message }</p> }
    </Section>
  );
};

export default NewTask;
