import React, { useCallback, useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHTTP from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const url = 'https://react-course-51208-default-rtdb.firebaseio.com/tasks.json'

  const transformData = (data) => {
    let taskList = []

    for (let key in data) {
      taskList.push({
        id: key,
        text: data[key].text
      })
    }

    setTasks(taskList)
  }

  const { isLoading, error, sendRequest } = useHTTP()

  useEffect(() => {
    sendRequest({ url: url }, transformData);
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask
        url={ url }
        onAddTask={ taskAddHandler }
        transformData={ transformData } />
      <Tasks
        items={ tasks }
        loading={ isLoading }
        error={ error }
        onFetch={ sendRequest }
      />
    </React.Fragment>
  );
}

export default App;
